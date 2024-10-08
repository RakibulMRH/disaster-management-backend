"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransaction = void 0;
const typeorm_1 = require("typeorm");
const inventoryItem_model_1 = require("./inventoryItem.model");
const user_model_1 = require("./user.model");
let InventoryTransaction = class InventoryTransaction {
};
exports.InventoryTransaction = InventoryTransaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventoryTransaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventoryItem_model_1.InventoryItem, (item) => item.transactions, { onDelete: 'CASCADE' }),
    __metadata("design:type", inventoryItem_model_1.InventoryItem)
], InventoryTransaction.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InventoryTransaction.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], InventoryTransaction.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InventoryTransaction.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], InventoryTransaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "notes", void 0);
exports.InventoryTransaction = InventoryTransaction = __decorate([
    (0, typeorm_1.Entity)()
], InventoryTransaction);
