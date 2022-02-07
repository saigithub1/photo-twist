import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  _albums = [];
  private pageNumber = 0;
  constructor(private _lightbox: Lightbox, private http: HttpClient,) {
    // for (let i = 1; i <= 4; i++) {
    //   const src = 'https://themyth92.com/project/ngx-lightbox/demo/img/image' + i + '.jpg';
    //   const caption = 'Image ' + i + ' caption here';
    //   const thumb = 'https://themyth92.com/project/ngx-lightbox/demo/img/image' + i + '-thumb.jpg';
    //   const album = {
    //      src: src,
    //      caption: caption,
    //      thumb: thumb
    //   };
 
    //   this._albums.push(album);
    // }
  }
 
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  ngOnInit() {
    this.getPhotos();

  }

  private getPhotos() {
    const url = `https://picsum.photos/v2/list?page=${this.pageNumber}&limit=5`;
    this.http.get<any[]>(url).subscribe((item) =>{
      const fetchedPhotos = item.forEach((itemForPicture) => {
        this._albums.push({
               src: itemForPicture.download_url
            
            });
      });
    });

  }

  onScroll() {
    this.pageNumber = this.pageNumber + 1;
    this.getPhotos();
  }
}
