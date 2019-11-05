import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
      let item = this.itemName;
      console.log(item);
      this.shoppingList.push(item);
      this.itemName = '';
      await this.storage.set('productList', JSON.stringify(this.shoppingList));
    }
  }

  deleteItem(index) {
    this.shoppingList.splice(index, 1);
    this.storage.set('productList', JSON.stringify(this.shoppingList));
  }

  async updateItem(index) {
    let alert = await this.alertCtrl.create({
      message: 'Type to update',
      inputs: [{ name: 'editItem', placeholder: 'Item'}],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                {text: 'update', handler: data => {
                  this.shoppingList[index] = data.editItem;
                  this.storage.set('productList', JSON.stringify(this.shoppingList));
                 }
                }
              ]
            });
    alert.present();
  }

  deleteAll(){
    this.shoppingList = [];
    this.storage.set('productList', JSON.stringify(this.shoppingList));
  }

}
