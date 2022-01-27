import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'Hola...it works! ';

    changeHandler(event) {
        this.greeting = event.target.value;
  }

}