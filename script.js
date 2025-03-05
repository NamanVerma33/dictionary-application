const form = document.querySelector('form');
const display = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word)=>{
    display.innerHTML = `<p>Fetching Data.....</p>`

    try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
   
        
    console.log(data);
    
    
    let definitions = data[0].meanings[0].definitions[0];
    display.innerHTML = `<h2><strong>Word: </strong>${data[0].word}</h2>
    <p class='partOfSpeech'>${data[0].meanings[0].partOfSpeech}</p>
    <p><b>Meaning: </b>${definitions.definition === undefined ? "Not Found": definitions.definition }</p>
    <p><b>Example: </b>${definitions.example=== undefined ? "Not Found": definitions.example}</p>
    <p><b>Antonym: </b></p>`

    if(definitions.antonyms==0){
        display.innerHTML += `<span>Not found.</span> `
    }
    else{
        for(let i=0;i<definitions.antonyms.length;i++){
            display.innerHTML += `<li>${definitions.antonyms[i]}</li>`
        }
    }

    if(definitions.synonyms==0){
        display.innerHTML += `<p><b>Synonyms: </b>Not Found</p>`
    }
    else{
        for(let i=0;i<definitions.synonyms.length;i++){
            display.innerHTML += `<p><b>Synonyms: </b></p><li>${definitions.synonyms[i]}</li>`
        }
    }

    let url = data[0].sourceUrls;

    if(url==0){
         display.innerHTML += `<p><b>URL: Not Found</b></p>`
    }
    else{
        display.innerHTML += `<p><b>URL:  <a href="${url}">Link</a></b></p>`
    }
   
} catch (error) {
      display.innerHTML = `<h3>Word meaning not found</h3>`  
}

} 