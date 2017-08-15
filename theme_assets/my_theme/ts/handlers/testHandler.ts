import {LocationHelper} from "./LocationHelper";

export default class TestHandler {
    constructor() {
        let locationHelper = new LocationHelper();

        if(locationHelper.queryStringHas('test')) {
            alert('i see test');
        }
    }
}