import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from '/styles/Tool.module.css';
import template from '/styles/Templates/Nomenclature.module.css'
import Plus from '/assets/plus.svg'
import { useRef } from 'react';
import Change from '/assets/change.svg';
import useGrab from '/cardHooks/useGrab.jsx';
import useCapture from '../../cardHooks/useCapture';


export default function NomenclatureTool({ setListOfCards, listOfCards }) {

    const Ref1 = useRef();
    const { action, handlers, styleGrab } = useGrab();
    const [form, setForm] = useState(
        {
            size: "Moyen",
            text: "",
            textSize: "2",
            image: "",
            imageStyle: 1,
            imageSize: 60,
            styleGrab:{
                objectPosition: "50%"
            },
            BorderColor: "#72797D",
            line: false,
            full: false,
            bold: false,
            cursive: false,
            shape: "Normal"
        }
    );
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (action === "click") {
            form.imageStyle <= 3 ?
                setForm(form => { return { ...form, imageStyle: form.imageStyle + 1 } })
                : setForm({ ...form, imageStyle: 1 });
        } 
        if (action === "longpress") {
            setForm(form => { return { ...form, styleGrab: styleGrab } })
        }
    }, [action])

    const Capture = useCapture();
    const validateForm = () => {
        console.log("validating...")
        if (image) {
            return true
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log(image);
            console.log(form);
            const vignette = await Capture(Ref1.current);
            setListOfCards([...listOfCards,
            {
                name: form.text,
                vignette: vignette,
                form: form
            }]);
        }

    }
    const handleLine = () => {
        setForm(form=>{return{...form,line:!form.line}})
    }
    const handleImage = (e) => {
        if (e.target.files[0]) {
            let newImage = URL.createObjectURL(e.target.files[0]);
            setImage(newImage);
            setForm({...form,
                image:newImage
            })
        }
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
            <form onSubmit={handleSubmit}>
                <div className={styles.radios} onChange={handleChange}>
                    <div>
                        <input type="radio" name="size" id="Petit" value="Petit" />
                        <label htmlFor="Petit">Petit</label>
                    </div>
                    <div>
                        <input type="radio" name="size" id="Moyen" value="Moyen" defaultChecked />
                        <label htmlFor="Moyen">Moyen</label>
                    </div>
                    <div>
                        <input type="radio" name="size" id="Grand" value="Grand" />
                        <label htmlFor="Grand">Grand</label>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="textSize">Taille du texte</label>
                        <input type="range" name="textSize" id="textSize" min="1" max="3" onChange={handleChange} />
                    </div>
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
                    <div>
                        <label htmlFor="borderColor">Couleur</label>
                        <input type="color" id="borderColor" name="BorderColor" onChange={handleChange}></input>
                    </div>
                    {(form.imageStyle == 4) &&
                        <div>
                            <label htmlFor="imageSize">Taille de l'image</label>
                            <input type="range" name="imageSize" id="imageize" min="20" max="100" value={form.imageSize} onChange={handleChange} />
                        </div>}
                    <button type="submit">Envoyer</button>
                </div>

                <div className={template.template} ref={Ref1}>

                    {image ?
                        <img className={template.image + ' ' + template["image" + form.imageStyle]}
                            style={(form.imageStyle===4)?{...styleGrab,width:form.imageSize+"%"}:{...styleGrab}}
                            src={image}
                            draggable={false}
                            {...handlers} /> : ''}
                    <label htmlFor="image" className={template.label} >
                        {image ? <Change className={template.change + ' remove-me'} />
                            : <Plus className={template.plus} />}
                    </label>
                    <input type="file" id="image" name="image" accept="image/png, image/jpeg " style={{ display: 'none' }}
                        onChange={handleImage} />
                    <div className={template.contour} style={{ borderColor: form.BorderColor }}></div>
                    <div className={(!form.line)?template.line+" remove-me":template.line} onClick={handleLine} style={form.line?{backgroundColor: form.BorderColor, opacity:1 }:{backgroundColor: form.BorderColor}}></div>

                    <input type="text" className={template.text + ' ' + template["text" + form.textSize]} name="text" id="text" onChange={handleChange} value={form.text} placeholder="Exemple" />
                    <div className={template.textBorder + ' ' + template.text + ' remove-me'}></div>
                </div>
            </form>
        </>


    )
}
