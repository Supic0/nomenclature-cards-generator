import React from 'react'
import { useState } from 'react';
import styles from '/styles/Tool.module.css';
import template from '/styles/Templates/Nomenclature.module.css'
import imageTest from '/assets/test2.jpg'
import { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

export default function NomenclatureTool({ setListOfCards, listOfCards }) {

    const Ref1 = useRef(null);

    const [form, setForm] = useState(
        {
            size: "Moyen",
            text: "",
            full: false,
            bold: false,
            cursive: false,
            shape: "Normal"
        }
    );
    const [image, setImage] = useState(null);

    const Capture = (element) => {
       return htmlToImage.toSvg(element)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
                return img.src;
            })
            .catch(function (error) {
                console.error('oops, la fonction onCapture ne fonctionne pas', error);
            });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(image);
        console.log(form);
        const vignette = await Capture(Ref1.current);

        setListOfCards([...listOfCards,
        {
            name: form.text,
            vignette: vignette,
            form: form,
        }]);

    }

    const handleImage = (e) => {
        //let newImage = URL.createObjectURL(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    const handleChange = (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setForm({
            ...form,
            [target.name]: value,
        });
    }



    return (
        <>
            <div>NomenclatureTool</div>
            <form onSubmit={handleSubmit}>
                <div className={styles.radios} onChange={handleChange}>
                    <div>
                        <input type="radio" name="size" id="Petit" value="Petit" />
                        <label htmlFor="Petit">Petit</label>
                    </div>
                    <div>
                        <input type="radio" name="size" id="Moyen" value="Moyen" defaultChecked/>
                        <label htmlFor="Moyen">Moyen</label>
                    </div>
                    <div>
                        <input type="radio" name="size" id="Grand" value="Grand" />
                        <label htmlFor="Grand">Grand</label>
                    </div>
                </div>

                <input type="file" id="image" name="image" accept="image/png, image/jpeg"
                    onChange={handleImage} />
                <input type="text" name="text" id="text" onChange={handleChange} value={form.text} />
                <div>
                    <div>
                        <input type="checkbox" name="bold" id="Bold" onChange={handleChange} checked={form.bold} />
                        <label htmlFor="Bold">Bold</label>
                    </div>
                    <div>
                        <input type="checkbox" name="full" id="Full" onChange={handleChange} checked={form.full} />
                        <label htmlFor="Full">Full</label>
                    </div>
                    <div>
                        <input type="checkbox" name="cursive" id="Cursive" onChange={handleChange} checked={form.cursive} />
                        <label htmlFor="Cursive">Cursive</label>
                    </div>
                    <div onChange={handleChange}>
                        <div>
                            <input type="radio" name="shape" id="Normal" value="Normal" defaultChecked />
                            <label htmlFor="Normal">Normal</label>
                        </div>
                        <div>
                            <input type="radio" name="shape" id="Large" value="Large" />
                            <label htmlFor="Large">Large</label>
                        </div>
                    </div>
                    <button type="submit">Envoyer</button>
                </div>

                <div className={template.template} ref={Ref1}>
                    <img src={imageTest.src} className={template.image} />
                    <div className={template.contour}></div>
                    <div className={template.line}></div>
                    <div className={template.text}>Cheval</div>
                </div>
            </form>
        </>


    )
}
