import axios from "axios";
import {RiCelsiusFill} from 'react-icons/ri'
import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState(""); //bu state kullanıcının girdiği şehir isimlerini saklar
  const [info, setInfo] = useState({}); // bu state API dan alının hava durumu bilgilerini saklar o yüzden süslü parantezler içindedir
  const [isActive, setIsActive] = useState(false); //verileri getir butonuna tıklanma durumunda hava durumu bilgilerini göstersin diye yapıyoruz

  const handleChange = (e) => {
    //bu fonksiyonumuz ile girdiğimiz şehir ismini city state imize kaydeder
    setCity(e.target.value);
  };

  const handleClick = async () => {
    const api = "ff08186d7c4dcc1491bd31d5ea0aaaf8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    console.log("click oldu", url);
    console.log(url);
    await axios(url)
      .then(async data => {
        await setInfo(data.data);
      })
      .catch((err) => console.log("Hatanız: ", err));
      setIsActive(true)
  };
  return (
    <div>
      <h1>Hava Durumu Uygulaması</h1>
      <div className="form">
        <input
          onChange={handleChange}
          value={city}
          className="inputText"
          type="text"
          placeholder="Şehri giriniz"
        />
      </div>
      <div className="btnDiv">
        <button onClick={handleClick} className="btn">
          Verileri Getir
        </button>
      </div>

      
      {isActive ? <div className="info">

            <p>{info.name} {info.sys.country}</p>
            <div className="genelDeger">
                <p id="sicaklik">{info.main.temp}</p><RiCelsiusFill className="fa-c"/>
            </div>

            <p>Hava Durumu</p>
            <div className="his">
                <p id="hissedilen">Hissedilen : {info.main.feels_like}</p> <RiCelsiusFill className="fa-circle"/>
            </div>


      </div> : null}
    </div>
  );
}
