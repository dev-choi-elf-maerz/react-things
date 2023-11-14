import React, { useRef, useState } from 'react'
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [ imageUrl, setImageUrl ] = useState('/');
    const [ loading, setLoading ] = useState(false);
    const inputRef = useRef(null);
    const imageGenerator = async () => {
        
    const key = "Beare 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";

    if (inputRef.current.value === '') return;
        setLoading(true);
        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key
                },
                body: JSON.stringify(
                    {
                        prompt: `${inputRef.current.value}`,
                        n: 4,
                        size: "512x512",
                    }
                )
            }
        );
            const data = await response.json();
            console.log(data);
            const data_array = data.data;
            setImageUrl(data_array[0].url);
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    }

    return (
        <>
        <div className='ai-image-generator'>
            <div className="header">
                Ai image <span>generator</span>
            </div>
            <div className="img-loding">
                <div className="image">
                    <img src={imageUrl === '/' ? default_image : imageUrl} alt="" className="" />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" className="search-input" ref={inputRef} placeholder='상상하는 이미지를 표현해 보세요.(영문으로 작성해주세요.)'/>
                <div className="generate-btn" onClick={() => {imageGenerator()}}>
                    생성하기
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageGenerator

