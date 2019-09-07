## Ecommerce
## Steps
1. Rename sample.env to .env
2. Put all environment varibles value in .env file.
3. Create Database
4. npm install and run project it will create Tables.
4. Create Account & Inventory by using below queries.

- Create Account 
```sql
INSERT INTO `ecommerce`.`account` (`email`, `firstName`, `lastName`, `mobileNo`, `password`, `status`, `type`,`createdAt`,`updatedAt`) VALUES ('sajagporwal123@gmail.com', 'sajag', 'porwal', '8764004296', '123456', 'ACTIVE', 'CUSTOMER',current_timestamp(),current_timestamp());
```
- Create Inventory
```sql
INSERT INTO `ecommerce`.`inventory` (`productCode`, `name`, `price`, `availableQuantity`, `createdAt`, `updatedAt`) VALUES ('P1', 'mango', '12', '10', current_timestamp(), current_timestamp());
INSERT INTO `ecommerce`.`inventory` (`productCode`, `name`, `price`, `availableQuantity`, `createdAt`, `updatedAt`) VALUES ('P2', 'apple', '22.50', '15', current_timestamp(), current_timestamp());
```
- Create Order Api <br/>
API URI = http://localhost:4000/api/v1/order/create // use port which is added in .env file

 Request Body Sample

```json
{
    "state":"Gujrat",
	"address":"gota",
	"accountId":1,
	"pincode":123456,
	"orderList":[{
		"quantity":1,
		"inventoryId":1
	},
	{
		"quantity":1,
		"inventoryId":2
	}]
}
```