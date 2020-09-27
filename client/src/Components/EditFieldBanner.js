import React, {useState} from 'react'

function EditFieldBanner(props) {
    const [bannerName, setBannerName] = useState('');
    const [bannerPrice, setBannerPrice] = useState(0);
    const [bannerText, setBannerText] = useState('');
    const [bannerCategoryId, setBannerCategoryId] = useState('');

    const createBanner = (event) => {
        console.log("in create banner");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {name: bannerName, isDeleted: 'false', content: bannerText, price: bannerPrice}
            )
        };
        fetch('http://192.168.1.192:8080/category/' + bannerCategoryId + '/banner', requestOptions).then(response => response.json()).then(console.log('sent something')).catch(err => console.log("Error " + err));
    }

    const handleChangeCategoryId = (event) => {
        setBannerCategoryId(event.target.value);
    }

    const handleChangeName = (event) => {
        setBannerName(event.target.value);
    }

    const handleChangeBannerPrice = (event) => {
        setBannerPrice(event.target.value);
    }

    const handleChangeBannerText = (event) => {
        setBannerText(event.target.value);
    }


    const handleSubmitBannerInfo = (event) => {
        alert('A Banner was submitted: ' + bannerName + ' ' + bannerPrice + ' ' + bannerText);
        event.preventDefault();
    }

    const handleDeleteBanner = (event) => {
        alert('A Banner was deleted: ' + bannerName + ' ' + bannerPrice);
        event.preventDefault();
    }


    return (
        <div>
            <form onSubmit={createBanner}>
                <label>
                    Id:
                    <input type="number"
                        value={bannerCategoryId}
                        onChange={handleChangeCategoryId}/>
                </label>
                <label>
                    Banner Name:
                    <input type="text"
                        value={bannerName}
                        onChange={handleChangeName}/>
                </label>
                <label>
                    Banner Price:
                    <input type="number"
                        value={bannerPrice}
                        onChange={handleChangeBannerPrice}/>
                </label>
                <label>
                    Banner Text:
                    <input type="textarea"
                        value={bannerText}
                        onChange={handleChangeBannerText}/>
                </label>
                <button type="submit">Submit</button>
                <button onClick={handleDeleteBanner}>Delete</button>
            </form>
        </div>
    );
}

export default EditFieldBanner
