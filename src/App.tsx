import { useState } from 'react';
import style from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';
import {levels, calculateImc, Level} from './helpers/imc';


function App() {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCaculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    }else{
      alert('Preencha todos os campos');
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={style.main}>
      <header>
        <div className={style.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={style.container}>
        <div className={style.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para Indice de Masssa Corporea,
            parametro adotado pela Organização Mundial de Saúde para
            calcular o peso ideal de cada pessoa.
          </p>

          <input
            type="number"
            placeholder='Digite a sua altura. Ex 1.5 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder='Digite seu peso. Ex 75.3 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button disabled={toShow ? true : false} onClick={handleCaculateButton}>Calcular</button>
        </div>
        <div className={style.rightSide}>
          {!toShow &&
            <div className={style.grid}>
                {levels.map((item, key) => (
                  <GridItem key={key} data={item} />
                ))}
            </div>
          }
          {toShow &&
            <div className={style.rightBig}>
              <div className={style.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem data={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;

