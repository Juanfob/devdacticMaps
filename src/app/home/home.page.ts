import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapView: ElementRef;

  coordenadas: any;

  constructor() {
    this.test();
  }


async  test() {

    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();

      console.log('Current position:', coordinates);
      this.coordenadas = coordinates;
      alert(coordinates);
    };

    ;
  }

  async ionViewDidEnter() {

      const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: 38.33849, // 39.906561470668485,
      longitude: -0.50691, // -1.3679696265553307,
      zoom: 15
    });

    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      /*
        We can do all the magic here when map is ready
      */

      CapacitorGoogleMaps.addMarker({
        latitude: 38.33849, // 39.906561470668485,
        longitude: -0.50691, // -1.3679696265553307,
            title: 'Custom Title',
        snippet: 'Custom Snippet',
      });

      CapacitorGoogleMaps.setMapType({
        type: 'normal' // hybrid, satellite, terrain
      });
    });
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
