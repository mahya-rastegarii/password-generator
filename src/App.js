import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {FaClipboard} from 'react-icons/fa'
import useForm from './useForm';
import { getRandomChar, getSpecialChar } from './utils';
const App = () => {
  const [values, setValues] = useForm({
    length : 6,
    capital : true,
    small : true,
    number : false,
    symbol : false,
  })
  const[result, setResult] = useState("")

  const fieldsArray = [
    {
      fields : values.capital,
      getChar : () => getRandomChar(65, 90)
    },

    {
      fields : values.small,
      getChar :() => getRandomChar(97, 122)
    },

    { 
      fields : values.number,
      getChar :() => getRandomChar(48, 57)
    },

    {
      fields : values.symbol,
      getChar :() => getSpecialChar()
    }
  ]

  const handlerSubmit = (e) => {
      e.preventDefault();
      let generatePassword = "";
      const checkedFields = fieldsArray.filter(({fields}) => fields);

      for(let i = 0 ; i < values.length; i++) {
        const index = Math.floor(Math.random() * checkedFields.length );
        const letter = checkedFields[index]?.getChar();

        if(letter) {
          generatePassword += letter
        }
      }

      if(generatePassword) {
        setResult(generatePassword);
      }else {
        toast.error("لطفا حداقل یکی از گزینه ها را انتخاب کنید")
      }
  }

  const handleClipboard = async() => {
    if(result){
    await navigator.clipboard.writeText(result);
    toast.success("پسورد کپی شد")
    } else{
    toast.error("پسوردی برای کپی وجود ندارد")
  }
  }
  return (
    
    <section className="  w-100 d-flex justify-content-center align-items-center">
      <div className=' container p-4'>
      <form className='w-100' onSubmit={handlerSubmit}>
        <div className='mt-3'>
           <div className='result position-relative mb-3 overflow-hidden border-0'>
          
              <input type='text' className='form-control p-2 bg-transparent ' id='result' placeholder='حداقل 6 کاراکتر' readOnly value={result}/>
              <div className=' d-flex justify-content-center align-items-center position-absolute  clipboard' onClick={handleClipboard}>
              <FaClipboard ></FaClipboard>
            </div>
           </div>
           <div>
           <div className='field d-flex justify-content-between align-items-center'>
           <label htmlFor='length'>طول پسورد</label>
            <input type='number' name='length' id='length' value={values.length} onChange={setValues}  min={6} max={12} />  
           </div>

           <div className='field d-flex justify-content-between align-items-center'>
            <label htmlFor='capital'>حروف بزرگ</label>
            <input type='checkbox' name='capital' checked={values.capital} onChange={setValues} id='capital'/>
           </div>

           <div className='field  d-flex justify-content-between align-items-center'>
            <label htmlFor='small'>حروف کوچک</label>
            <input type='checkbox' name='small' checked={values.small} onChange={setValues} id='small'/>
           </div>

           <div className='field d-flex justify-content-between align-items-center'>
            <label htmlFor='number'>اعداد</label>
            <input type='checkbox' name='number' checked={values.number} onChange={setValues} id='number'/>
           </div>

           <div className='field d-flex justify-content-between align-items-center'>
            <label htmlFor='symbol'>کاراکترهای خاص</label>
            <input type='checkbox' name='symbol' checked={values.symbol} onChange={setValues} id='symbol'/>
           </div>
           </div>
           <button type='submit' className=' d-inline-block w-100'> تولید پسورد</button>
        </div>
      </form>
      </div>
    </section>
   
  );
}
 
export default App;
