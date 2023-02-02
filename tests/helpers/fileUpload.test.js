import { v2 as cloudinary } from 'cloudinary'
import { fetch } from "whatwg-fetch";
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'dtohsmkin',
    api_key: '611515372944252',
    api_secret: 'ljE0tNogzhUbh7aXJxZEz-ggBRI',
    secure: true
})

describe('Pruebas en fileUpload', () => { 


    test('debe de subir el archivo correctamente', async() => { 
        
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'pictureTest.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        //console.log(url);

         const segments = url.split('/');
         const imageId = segments[segments.length - 1].replace('.png', '');
         
         const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
         });
     })

     test('debe de retornar null', async() => { 

        const file = new File([], 'pictureTest.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
        
      })
 })