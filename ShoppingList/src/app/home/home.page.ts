import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Item } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  shoppingList = [];
  itemName: string;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.storage.ready().then(
      () => this.storage.get('productList').then(
        (value) => this.shoppingList = JSON.parse(value)
      )
    );
  }

  async addItem() {
    if (this.shoppingList.length >= 0) {
      let itemObject = new Item();
      let item = this.itemName;
      itemObject.name = item;
      itemObject.status = false;
      this.shoppingList.push(itemObject);
      await this.storage.set('productList', JSON.stringify(this.shoppingList));
      this.itemName = '';
    }
  }

  async deleteItem(index) {
    this.shoppingList.splice(index, 1);
    await this.storage.set('productList', JSON.stringify(this.shoppingList));
  }

  async updateItem(index) {
    let alert = await this.alertCtrl.create({
      message: 'Type to update',
      inputs: [{ name: 'editItem', placeholder: 'Item'}],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                {text: 'update', handler: async data => {
                  this.shoppingList[index].name = data.editItem;
                  await this.storage.set('productList', JSON.stringify(this.shoppingList));
                 }
                }
              ]
            });
    alert.present();
  }

  async deleteAll() {
    this.shoppingList = [];
    await this.storage.set('productList', JSON.stringify(this.shoppingList));
  }

  async itemChecked(index) {
    if (this.shoppingList[index].status === false) {
      this.shoppingList[index].status = true;
    } else  {
      this.shoppingList[index].status = false;
    }

    await this.storage.set('productList', JSON.stringify(this.shoppingList));
  }

}
