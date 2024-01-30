import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import "./ProfilPage.css"
import icon from "../../images/ui/ItemIcon058g.webp"
import loadImage from "../../images/ui/loader.gif"

export default function ProfilPage() {

    const [datas, setdatas] = useState([]);
    const [load, setload] = useState(false);
    const [url, seturl] = useState("");
    const [treesize, settreesize] = useState("");


    const handleTreeitem = useCallback((name) => {
      const lowerCaseName = name.toLowerCase();
      const lowerCaseTreesize = treesize.toLowerCase();
      if (lowerCaseName.includes(lowerCaseTreesize)) {
        const startIndex = lowerCaseName.indexOf(lowerCaseTreesize);
        const before = name.slice(0, startIndex);
        const matching = name.slice(startIndex, startIndex + treesize.length);
        const after = name.slice(startIndex + treesize.length);


        return (
          <>
            {before}
            <span className='highlighted'>{matching}</span>
            {after}
          </>
        );
      }
    }, [treesize]);
    
    

    function dragOverHandler(ev) {
        ev.preventDefault();
      }

      const handleUrl = async (e) => {
        try {
          const token = localStorage.getItem("token");   
          if (!token) {
            console.error("Token non trouvé dans le localStorage.");
            return;
          } 
          const response = await axios.post(process.env.REACT_APP_BASE_URL + "save_url", {
            url: url
          }, {
            headers: {
              Authorization: token
            }
          }); 
          console.log("Réponse du serveur :", response.data);
        } catch (error) {
          console.error("Erreur lors de l'envoi de la requête :", error);
        }
      }
      
      const handleDrop = async (ev) => {
          
          ev.preventDefault()
          try {
              setload(true)
                if (!ev.dataTransfer.files[0]) {
              setload(false)
                }
                console.log(ev.dataTransfer.files[0])
                     const form = new FormData()
                     let file = ev.dataTransfer.files[0]
                     form.append("test", file)
                     const datas = await axios.post("http://localhost:3001/api/mhgu/v1/testaaa",form, {
                       headers: {
                         Authorization: localStorage.getItem("token")
                       }
                     })
                     setdatas(datas.data.datas);
                } catch (error) {
                    setload(false)
                    console.log(error)
                }
                finally {
                    setload(false)
                }
      }

    const handleFile = async (e) => {
        if (e.target.files[0] !== undefined) {
            try {
                setload(true)
                const form = new FormData()
                let file = e.target.files[0]
                console.log(e.target.files)
                form.append("test", file)
                const datas = await axios.post("http://localhost:3001/api/mhgu/v1/testaaa",form, {
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                })
                setdatas(datas.data.datas);
            } catch (error) {
                console.log(error)
                setload(false)
            }
            finally {
                setload(false)
            }
        }
      }

    useEffect(() => {
        const getDatas = async() => {
            console.log(process.env.REACT_APP_BASE_URL)
            const datas = await axios.get(process.env.REACT_APP_BASE_URL + "profil", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            console.log(datas)
            setdatas(datas.data.datas)
        }
        try {
            getDatas()
        } catch (error) {
            console.log(error)
        }
    }, [])


  return (
    <div className='profil_page_container'>
        {load && <div className='profil_page_container__loader'>
            <p>Chargement des données ...</p>
            <img src={loadImage} width={200} />
        </div> }
        
        <input type="text" placeholder='Chemin du fichier' value={url} onChange={e => seturl(e.target.value)}/>
        <button onClick={handleUrl}>Enregistrer</button>
        <input id="test" webkitdirectory className='profil_page_container_inputfile' type="file" onChange={handleFile} name="test"/>
        <label className='profil_page_container_inputlabel' onDragOver={(ev) => dragOverHandler(ev)} onDrop={(ev) => handleDrop(ev)} for="test">
            <img src={icon} alt="" width={50}/>
        </label>
        {datas[0] != {} ? 
            datas.map((datas, index) => {
                return (
                <div key={datas.charName}><h1>Hunter {datas.charName}</h1>
        <p>Hunter Rank: {datas.hunterRank}</p>
        <p>Gender : {datas.playerGender}</p>
        <p>Weapon : {datas.weapon_type}</p>
        <p>{datas.playTime.heures}:{datas.playTime.minutes}</p>
        <p>{datas.funds}z</p>
        <p>Hr points: {datas.hr_points}</p>
        <div className="profil_page_container_grid">
            <div className="profil_page_container_grid_item">
                <h3>Academy points</h3>
                <p>{datas.academy_points}</p>
            </div>
            <div className="profil_page_container_grid_item">
                <h3>Bherna points</h3>
                <p>{datas.bherna_points}</p>
            </div>
            <div className="profil_page_container_grid_item">
                <h3>Kokoto points</h3>
                <p>{datas.kokoto_points}</p>
            </div>
            <div className="profil_page_container_grid_item">
                <h3>Pokke points</h3>
                <p>{datas.pokke_points}</p>
            </div>
            <div className="profil_page_container_grid_item">
                <h3>Yumuko points</h3>
                <p>{datas.yukumo_points}</p>
            </div>
        </div>
        <div className="profil_page_container__boxitems">   
        <input type="text" placeholder='Rechercher items' className='profil_page_container__input' value={treesize} onChange={e => settreesize(e.target.value)}/>
        <div className="profil_page_boxitems">
          {datas.boxItems.filter(item => item.name.toLowerCase().includes(treesize.toLowerCase())).map((item, index) => {
            if (treesize !== "") {
              return(
                <div key={item.itemId + (index - item.itemId)} className="profil_page_boxitems__item">
                  <p>{handleTreeitem(item.name)} <span className='first_span'>{item.itemCount}</span></p>
                </div>
                )
            }

            return(
            <div key={item.itemId + (index - item.itemId)} className="profil_page_boxitems__item">
              <p>{item.name} <span className='first_span'>{item.itemCount}</span></p>
            </div>
            )
            
          })}
            </div>
          </div>
        </div>
                )
            })
        : null}
    </div>
  )
}
