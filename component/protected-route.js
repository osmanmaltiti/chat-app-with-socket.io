import React from 'react';
import { useRouter } from 'next/router';

const Protected = (Component) => {
  return (props) => {
      if(typeof window !== "undefined"){
          const router = useRouter();
          const user = JSON.parse(localStorage.getItem("currentUser"));
          if(!user){
              router.replace('/sign');
              return null;
          }
          else{
              return <Component {...props}/>
          }
      }
      return null;
  }
}

export default Protected;