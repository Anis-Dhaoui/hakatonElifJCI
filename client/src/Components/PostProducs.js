import React, { useRef, useState } from 'react'
import { CustomInput, Input, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, postNewProduct } from '../Redux/Actions';

export default function PostProducts (props) {

    const userId = useSelector(state => state.auth.user._id);
    const dispatch = useDispatch();
    const [selectedImgs, setSeletctedImgs] = useState();
    const { control, handleSubmit } = useForm();
    const imgPreviewImag = useRef();

// $$$$$$$$$$$$$$$$$$$$ BEGIN HANDLE POST PRODUCT $$$$$$$$$$$$$$$$$$$$
    const postProduct = (data, e) =>{
        e.preventDefault();
        let formData = new FormData();
        var imagesArray = [];
        if(Object.keys(selectedImgs).length <= 8){
            for (const key of Object.keys(selectedImgs)) {
                // Change file name before using it //
                var blob = selectedImgs[key]; 
                var newFile = new File([blob], `${uuid()}-${userId}.${blob.type.split('/')[1]}`, {type: blob.type});
                imagesArray.push(newFile);
                // ****************************************************** //
                formData.append('images', imagesArray[key]);
            };
    
            const resetForm = () =>{
                e.target.reset();
                removeAllChildren(imgPreviewImag.current);
                setSeletctedImgs();
            }
            data.images = imagesArray;
            dispatch(postNewProduct(data, formData, resetForm));
        }else{
            document.getElementById('alertMsg').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> You could not upload more than 8 pictures. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
    };
// $$$$$$$$$$$$$$$$$$$$ END HANDLE POST PRODUCT $$$$$$$$$$$$$$$$$$$$

// $$$$$$$$$$$$$$$$$$$$ BEGIN UPDATE PRODUCTS $$$$$$$$$$$$$$$$$$$$
    const handleUpdateProduct = (data, e) =>{
        e.preventDefault() //prevent the form from submitting
        const body = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined));
        if(Object.keys(body).length > 0){
            dispatch(updateProduct(props.targetProduct._id, body));
        }else{
            toast.info('Nothing was edited');
        }
    };
    // $$$$$$$$$$$$$$$$$$$$ END UPDATE PRODUCTS $$$$$$$$$$$$$$$$$$$$

// $$$$$$$$$$$$$$$$$$$$ BEGIN HANDLE IMAGES PREVIEW $$$$$$$$$$$$$$$$$$$$
    const generatePreviewData = file => {
        const fr = new FileReader();
        return new Promise((resolve, reject) => {
          fr.addEventListener("load", e => {
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = fr.result;
            img.setAttribute("class", "m-1 rounded img-preview");
            div.appendChild(img);
            resolve(div);
          });
          fr.addEventListener("error", e => {
            reject();
          });
          fr.readAsDataURL(file);
        });
    };

    const removeAllChildren = el => {
        while (el.childElementCount) {
          el.removeChild(el.children[0]);
        }
    };
    
    const renderCollection = (collection, container) => {
        removeAllChildren(container);
        Promise.all(collection.map(generatePreviewData)).then(imgs =>
          imgs.map((img, i) => {
            img.setAttribute("index", i);
            return container.appendChild(img);
          })
        );
    };
    
    const onChangeFile = (e) => {
        e.preventDefault();
        let fileCollection = [];

        while (fileCollection.length) {
            fileCollection.pop();
        }
        
        Array.from(e.target.files).map(f => fileCollection.push(f));
        renderCollection(fileCollection, imgPreviewImag.current);
        setSeletctedImgs(fileCollection);
    }
// $$$$$$$$$$$$$$$$$$$$ END HANDLE IMAGES PREVIEW $$$$$$$$$$$$$$$$$$$$


    return (
        // $$$$$$$$$$$$$$$$$$$$ THIS FORM IS SWISS KNIFE THAT POST OR UPDATE PRODUCT $$$$$$$$$$$$$$$$$$$$
        <Form id="post-product-form" className="py-5" onSubmit={handleSubmit(props.targetProduct ? handleUpdateProduct : postProduct)}>
            <div className='mb-3 mx-auto' id="alertMsg"></div>
            <Row>
                <Col md lg={props.targetProduct ? 12 : 6}>
                    <FormGroup>
                        <Label for="productName">Adventure Name</Label>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    placeholder="Adventure name"
                                    onChange={(name) => field.onChange(name)}
                                    required
                                    defaultValue={props.targetProduct ? props.targetProduct.name : null}
                                />
                            )}
                        />

                    </FormGroup>
                    <FormGroup>
                        <Label for="productPrice">How many days</Label>
                        <Controller
                            control={control}
                            name="price"
                            render={({ field }) => (
                                <Input
                                    onKeyPress={(e) => !/[0-9 .]/.test(e.key) ? e.preventDefault() : null}
                                    placeholder="Days"
                                    onChange={(price) => field.onChange(price)}
                                    required
                                    defaultValue={props.targetProduct ? props.targetProduct.price : null}
                                />
                            )}
                        />

                    </FormGroup>
                    <FormGroup>
                        <Label for="productDescription">Description</Label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <Input
                                    type="textarea"
                                    placeholder="Adventure description"
                                    onChange={(description) => field.onChange(description)}
                                    rows="8"
                                    required
                                    defaultValue={props.targetProduct ? props.targetProduct.description : null}
                                />
                            )}
                        />

                    </FormGroup>
                </Col>
                {
                props.targetProduct ?
                <Input type="submit" value="Update Adventure" className=" w-50 mx-auto btn btn-outline-warning"></Input>
                :
                <Col md lg={6}>
                

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="productImage">Place images </Label>
                                <Controller
                                    control={control}
                                    name="images"
                                    render={({ field }) => (
                                        <CustomInput
                                            type="file"
                                            accept="images/*"
                                            multiple
                                            onChange={(image) =>  {
                                                onChangeFile(image);
                                                field.onChange(image);
                                            }}
                                            label="Choose some images (Max: 8 images)"
                                            id="images"
                                            style={{cursor: "pointer"}}
                                            required = {props.targetProduct ? false : true}
                                            
                                        />
                                    )}
                                />

                            </FormGroup>
                        </Col>
                    </Row>

                
                    <Row>
                        <Col className="border mb-2 p-3" style={{height: "357px"}}>
                        {selectedImgs !== undefined ?
                            null
                            :
                            <img alt="imagePlaceholder" height="95%" width="95%" className="img-prev" 
                                src="https://montverde.org/wp-content/themes/eikra/assets/img/noimage-420x273.jpg"
                            />
                        }
                        <div className="row border" ref={imgPreviewImag}></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                props.targetProduct ?
                                    null
                                :
                                    <Input type="submit" value="Post adventure" className="btn btn-outline-dark"></Input>
                            }
                        </Col>                        
                    </Row>
                </Col>
                }
            </Row>
        </Form>
    );
};