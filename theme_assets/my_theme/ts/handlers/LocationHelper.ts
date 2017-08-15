export class LocationHelper {
    private location;

    constructor() {
        this.location = document.location;
    }

    public getHref(): string {
        return this.location.href;
    }

    public queryStringHas(key: string): boolean {
        return this.location.search.indexOf(key) !== -1;
    }
}