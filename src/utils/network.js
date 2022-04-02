export function API_URL(url){
  // return process.env.REACT_APP_API_URL + 'api/' + url
  // return 'http://localhost:4000/apiv1/' + url
  return "https://api.apployme.com/apiv1/" + url
      // return "https://stagapi.apployme.com/apiv1/" + url
} 

export function getBaseURL(url){
  return "https://app.apployme.com/" + url
    //  return "https://stagingapp.apployme.com/" + url
} 

export async function getRequest(url){
  let response = await fetch(API_URL(url), {
    method: "GET", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      // "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",  
  })

  return response
}

export async function getWithParamRequest(url,form){
  let response = await fetch(API_URL(url), {
    method: "GET", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      // "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      // "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",  
    body:form
  });
  return response;
}

export async function postFormData(url, form){
  let response = await fetch(API_URL(url), {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      // "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      // "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",  
    body: form,
    
  });
  return response
}

export async function putFormData(url, form){
  let response = await fetch(API_URL(url), {
    method: "PUT", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      // "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      // "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",  
    body: form
  })

  return response
}

export async function postJSON(url, json){
  let response = await fetch(API_URL(url), {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      // "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(json)
  })

  return response
}

export async function putJSON(url, json){
  let response = await fetch(API_URL(url), {
    method: "PUT", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      // "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(json)
  })

  return response
}

export async function deleteJSON(url){
  let response = await fetch(API_URL(url), {
    method: "DELETE", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",
  })

  return response
}



export async function setInstagram(url){
  let response = await fetch(getBaseURL(url), {
    method: "GET", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
    
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    redirect: "follow",
    referrer: "no-referrer",  
  })

  return response
}
