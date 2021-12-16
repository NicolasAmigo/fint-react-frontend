import React, { useState, useMemo, useEffect } from 'react';
import { MatchButtons } from './MatchButtons';
import MatchCard from './MatchCard';
import NavBar from './NavBar';
import '../css/MatchList.css';
import { Animal } from '../interfaces/animales';
import axios from 'axios';
import Cookies from 'universal-cookie';

const MatchList = () => {
  const [matches, setMatches] = useState<Animal[]>([{
    name: "",
    image: "",
    petSex: "",
    petCategory: "",
    petAge: ""
  }]);

  const [currentMail, setcurrentMail] = useState("")

  const idxInit = 2;

  const [currentIndex, ] = useState(1);

  const nextMatch = () => {
    try {
      console.log("next match 1");
      const cookie = new Cookies();
      axios
        .get('http://localhost:3001/user/nextmatch', {
          params: {
            mail: cookie.get("mail"),
          },
        })
        .then((res) => {
          if(res.data){
            setMatches([{
              image: res.data.image,
              name: res.data.petName,
              petSex: res.data.petSex,
              petCategory: res.data.petCategory,
              petAge: res.data.petAge
            }]);
            setcurrentMail(res.data.mail);
          }else{
            setMatches([{
              image: "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
              name: "No hay mas animales disponibles",
              petSex: "",
              petCategory: "",
              petAge: ""
            }]);
          }
        });
    } catch (error) {
      console.log('error al traer nextmatch');
    }
  };

  useEffect(() => nextMatch(), []);

  const reject = () => {
    try {
      const cookie = new Cookies();
      axios({
        method: "post",
        data: {
          mail: cookie.get("mail"),
          otherMail: currentMail
        },
        url: "http://localhost:3001/user/reject",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.log("Error al hacer el reject");
    }
  }

  const accept = () => {
    try {
      const cookie = new Cookies();
      axios({
        method: "post",
        data: {
          mail: cookie.get("mail"),
          otherMail: currentMail
        },
        url: "http://localhost:3001/user/match",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.log("Error al hacer el accept");
    }
  }

  const childRefs: Array<any> = useMemo(
    () => (
      Array(idxInit)
        .fill(0)
        .map((i) => React.createRef())
  ),[]);


  const swiped = (dir: string, idx: number) => {
    if (dir === "left" && matches[0].petCategory !== "") {
      reject();
    }
    if (dir === "right" && matches[0].petCategory !== "") {
      accept();
    }
  };

  const outOfFrame = (idx: number) => {
    if(matches[0].petCategory === ""){
      childRefs[currentIndex].current.restoreCard();
    }else{
      nextMatch();
    }
  };

  const swipee = async (dir: string) => {
    await childRefs[currentIndex]?.current?.swipe(dir);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="match_cards">

        { matches.map( (match, index) => {
          return (          
          <MatchCard
            key={index}
            animal={match}
            index={index}
            functions={[swiped, outOfFrame]}
            currRef={childRefs[currentIndex]}
          />)
        })

        }
      </div>

      <MatchButtons swipee={swipee} />
    </>
  );
};

export default MatchList;
