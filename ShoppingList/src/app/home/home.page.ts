import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

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
    public alertCtrl: AlertController
  ) {}

  addItem() {
    if (this.shoppingList.length >= 0) {
      let item = this.itemName;
      console.log(item);
      this.shoppingList.push(item);
      this.itemName = '';
    }
  }

  deleteItem(index) {
    this.shoppingList.splice(index, 1);
  }

  async updateItem(index) {
    let alert = await this.alertCtrl.create({
      message: 'Type to update',
      inputs: [{ name: 'editItem', placeholder: 'Item'}],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                {text: 'update', handler: data => {
                  this.shoppingList[index] = data.editItem; }
                }
              ]
            });
    alert.present();
  }

  deleteAll(){
    this.shoppingList = [];
  }

}
