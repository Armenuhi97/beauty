import { Component } from "@angular/core";
import { City, Country } from "@models/country-city";
import { ServerResponse } from "@models/server-respoce";
import { NzMessageService } from "ng-zorro-antd/message";
import { Subject } from "rxjs";
import { finalize, map, switchMap, takeUntil } from "rxjs/operators";
import { CountryService } from "./country.service";

@Component({
    selector: 'app-country',
    templateUrl: 'country.component.html',
    styleUrls: ['country.component.scss']
})
export class CountryComponent {
    unsubscribe$ = new Subject();
    public countries: Country[] = [];
    public citites: City[] = []
    activeCountry: Country;
    isShowCountryModal: boolean = false;
    public editCountryIndex: number;
    public editCountryValue: Country;
    public isShowCityModal: boolean = false;
    editCityIndex: number;
    editCityValue: City;
    constructor(private _countryService: CountryService,
        private _nzMessages: NzMessageService) { }
    ngOnInit() {
        this._getCountrieslist().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    private _getCountrieslist() {
        return this._countryService.getCountriesList().pipe(map((data: ServerResponse<Country[]>) => {
            this.countries = data.results
        }))
    }
    addCountry() {
        this.isShowCountryModal = true
    }
    onAddCity() {
        this.isShowCityModal = true

    }
    onEditCountry(country: Country, id: number) {
        this.isShowCountryModal = true;
        this.editCountryIndex = id;
        this.editCountryValue = country;
    }
    onEditCity(city: City, id: number) {
        this.isShowCityModal = true;
        this.editCityIndex = id;
        this.editCityValue = city;
    }
    deleteCity(id: number, ind: number) {
        this.isShowCountryModal = false;
        this._countryService.deleteCity(id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.citites.splice(ind, 1)
        },
            () => {
                this._nzMessages.error('fail');
            })
    }
    deleteCountry(id: number, ind: number) {
        this.isShowCountryModal = false;
        this._countryService.deleteCountry(id).pipe(takeUntil(this.unsubscribe$), finalize(() => { this.activeCountry = null })).subscribe(() => {
            this.countries.splice(ind, 1);
        },
            () => {
                this._nzMessages.error('fail');
            })
    }
    getCity(country: Country) {
        this.activeCountry = country
        this.getCityByCategory().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public getCityByCategory() {
        return this._countryService.getCitiesList(this.activeCountry.id).pipe(map((data: ServerResponse<City[]>) => {
            this.citites = data.results;            
        }))
    }
    public closeCountry() {
        this._resetValue();
        this.isShowCountryModal = false;
    }
    public closeCity() {
        this.isShowCityModal = false;
    }
    private _resetValue() {
        this.editCountryValue = null;
        this.editCountryIndex = null;
        this.editCityValue = null;
        this.editCityIndex = null
    }
    public editOrAddCountry(evt) {
        const formValue = evt;
        let sendObject = Object.assign({}, formValue, { code: formValue.title_en.slice(0, 3) })
        this.isShowCountryModal = false;
        if (this.editCountryIndex || this.editCountryIndex == 0) {
            this._countryService.changeCountry(this.countries[this.editCountryIndex].id, sendObject).pipe(takeUntil(this.unsubscribe$), switchMap(() => {
                this._resetValue();
                return this._getCountrieslist()
            })).subscribe()
        } else {
            this._countryService.addCountry(sendObject).pipe(takeUntil(this.unsubscribe$), switchMap(() => {
                this._resetValue();
                return this._getCountrieslist()
            })).subscribe()
        }
    }
    public editOrAddCity(evt) {
        const formValue = evt;
        let sendObject = Object.assign({}, formValue, {
            country: this.activeCountry.id,
            logitude: null,
            latitude: null
        })
        this.isShowCityModal = false;
        if (this.editCityIndex || this.editCityIndex == 0) {
            this._countryService.changeCity(this.citites[this.editCityIndex].id, sendObject).pipe(takeUntil(this.unsubscribe$), switchMap(() => {
                this._resetValue();
                return this.getCityByCategory()
            })).subscribe()
        } else {
            this._countryService.addCity(sendObject).pipe(takeUntil(this.unsubscribe$), switchMap(() => {
                this._resetValue();
                return this.getCityByCategory()
            })).subscribe()
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}