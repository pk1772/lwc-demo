import { LightningElement, api, track } from 'lwc';

export default class CustomTable extends LightningElement {
    @track _rows;
    @track _columns;

    @api
    get rows() {
        return this._rows;
    }
    set rows(value){
        this._rows = value;
    }

    @api
    get columns() {
        return this._columns;
    }
    set columns(value){
        this._columns = value;
    }

    get numOfColumns(){
        return this._rows.length;
    }
}
