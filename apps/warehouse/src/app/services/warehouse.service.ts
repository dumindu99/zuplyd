import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Warehouse, WarehouseDocument } from "../schemas/warehouse.schema";
import { StoreItem, StoreItemDocument } from "../schemas/storeitem.schema";

@Injectable()
export class WarehouseService {

    constructor(@InjectModel(Warehouse.name) private warehouseModel: Model<WarehouseDocument>, @InjectModel(StoreItem.name) private storeitemModel: Model<StoreItemDocument>) {}
    
    async create(warehouse: Warehouse): Promise<Warehouse> {
        const newWarehouse = new this.warehouseModel(warehouse);
        return newWarehouse.save();
    }
    
    getData(): { message: string } {
        return { message: 'Welcome to warehouse!' };
    }
    
    async readAll(): Promise<Warehouse[]> {
        return await this.warehouseModel.find().exec();
    }

    async readById(id): Promise<Warehouse> {
        return await this.warehouseModel.findById(id).exec();
    }

    async readByLocation(location): Promise<Warehouse[]> {
        return await this.warehouseModel.find({location:location}).exec();
    }

    async readByCompany(company): Promise<Warehouse[]> {
        return await this.warehouseModel.find({company_id:company}).exec();
    }

    async readByManager(manager): Promise<Warehouse[]> {
        return await this.warehouseModel.find({manager_id:manager}).exec();
    }

    async update(id, warehouse: Warehouse): Promise<Warehouse> {
        return await this.warehouseModel.findByIdAndUpdate(id, warehouse, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.warehouseModel.findByIdAndRemove(id);
    }

    async assignShop(id, shop: {shop_id:string, shop_name:string}): Promise<Warehouse> {
        const warehouse = await this.warehouseModel.findById(id).exec();
        warehouse.assigned_shops.push(shop);
        return await this.warehouseModel.findByIdAndUpdate(id, warehouse, {new: true})
    }

    async unAssignShop(id, shop_id): Promise<Warehouse> {
        const warehouse = await this.warehouseModel.findById(id).exec();
        const newShopList = warehouse.assigned_shops.filter(shop => shop.shop_id != shop_id);
        warehouse.assigned_shops = newShopList;
        return await this.warehouseModel.findByIdAndUpdate(id, warehouse, {new: true})
    }

    //items
    async readAllItems(id): Promise<StoreItem[]> {
        return await this.storeitemModel.find({warehouse_id:id}).exec();
    }

    async createItem(storeitem: StoreItem): Promise<StoreItem> {
        const newStoreItem = new this.storeitemModel(storeitem);
        return newStoreItem.save();
    }

    async updateItem(id, storeitem: StoreItem): Promise<StoreItem> {
        return await this.storeitemModel.findByIdAndUpdate(id, storeitem, {new: true})
    }

    async deleteItem(id): Promise<any> {
        return await this.storeitemModel.findByIdAndRemove(id);
    }
}
