import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, MyLocation, GoogleMapsAnimation, Marker, Geocoder, ILatLng } from '@ionic-native/google-maps';
import { AngularFireAuth } from '@angular/fire/auth';

declare let google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  private loading: any;
  private map: GoogleMap;
  public search: string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  private originMarker: Marker;
  public destination: any;
  private googleDirectionsService = new google.maps.DirectionsService();


  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private ngZone: NgZone,
    private afa: AngularFireAuth

  ) { }

  ngOnInit() {

    this.mapElement = this.mapElement.nativeElement;

    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';

    this.loadMap();
  }
 
  async loadMap(){
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    await this.loading.present();

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCxv8TlekFH6-XmU64pPnK_b771mjkgnAo',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCxv8TlekFH6-XmU64pPnK_b771mjkgnAo'
    });

    const mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false
      }
    };

    this.map = GoogleMaps.create(this.mapElement, mapOptions);

    try{
      await this.map.one(GoogleMapsEvent.MAP_READY);

      this.addOriginMarker();
    }catch(error){
      console.error(error);
    }
  }


  async addOriginMarker() {
    try {
      const myLocation: MyLocation = await this.map.getMyLocation();

      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });

      this.originMarker = this.map.addMarkerSync({
        title: 'Origem',
        icon: '#FF0000',
        animation: GoogleMapsAnimation.DROP,
        position: myLocation.latLng,

      });

    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }

  }
  searchChange() {
    if (!this.search.trim().length) return;

    this.googleAutocomplete.getPlacePredictions({ input: this.search }, predictions => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
    });
  }

  async calcRoute(item: any) {
    this.search = '';
    this.destination = item;

    const info: any = await Geocoder.geocode({ address: this.destination.description });

    let markerDestination: Marker = this.map.addMarkerSync({
      title: this.destination.description,
      icon: "#000",
      Animation: GoogleMapsAnimation.DROP,
      position: info[0].position
    });

    this.googleDirectionsService.route({
      origin: this.originMarker.getPosition(),
      destination: markerDestination.getPosition(),
      travelMode: 'DRIVING'
    }, async results => {
      const points = new Array<ILatLng>();

      const routes = results.routes[0].overview_path;

      for (let i = 0; i < routes.length; i++) {
        points[i] = {
          lat: routes[i].lat(),
          lng: routes[i].lng()
        }
      }

      await this.map.addPolyline({
        points: points,
        color: '#000',
        width: 3
      });

      this.map.moveCamera({ target: points });
    });
  }

  async back() {
    try {
      await this.map.clear();
      this.destination = null;
      this.addOriginMarker();

    } catch (error) {
      console.error(error);
    }
  }



}