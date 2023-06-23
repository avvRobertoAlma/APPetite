import Handlebars from "handlebars"
import { Filesystem, Directory } from '@capacitor/filesystem';

export const Services = {
    generateHTMLrecommendations(recommendations){
        
        let htmlText = ""
        htmlText += `<h1 class='centered'>Consigli nutrizionali</h1>
                    <h3 class='centered'>generati con APPetite</h3>
                    <h4 class='centered'>Dosi consigliate per ${recommendations.petName}</h4>
                    <ul class="list">
                        <li>Proteine: ${recommendations.recommendedDoses.proteine.valore} g di ${recommendations.recommendedDoses.proteine.nome}  </li>
                        <li>Cereali: ${recommendations.recommendedDoses.cereali.valore}  g di ${recommendations.recommendedDoses.cereali.nome} </li>
                        <li>Vitamine/Fibre:  ${recommendations.recommendedDoses.vitamine.valore} g di ${recommendations.recommendedDoses.vitamine.nome}</li>
                    </ul>

                    <h4 class='centered'>Alternative per le proteine</h4>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Nutriente</th>
                            <th>Quantità</th>
                        </tr>
                        </thead>
                        <tbody>
                        {{#each proteineAlternatives}}
                        <tr>
                            <td>{{this.nome}}</td>
                            <td>{{this.valore}}</td>
                        </tr>
                    {{/each}}
                        </tbody>
                    </table>

                    <h4 class='centered'>Alternative per i cereali</h4>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Nutriente</th>
                            <th>Quantità</th>
                        </tr>
                        </thead>
                        <tbody>
                        {{#each cerealAlternatives}}
                        <tr>
                            <td>{{this.nome}}</td>
                            <td>{{this.valore}}</td>
                        </tr>
                    {{/each}}
                        </tbody>
                    </table>

                    <h4 class='centered'>Alternative per le vitamine/fibre</h4>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Nutriente</th>
                            <th>Quantità</th>
                        </tr>
                        </thead>
                        <tbody>
                        {{#each vitamineAlternatives}}
                        <tr>
                            <td>{{this.nome}}</td>
                            <td>{{this.valore}}</td>
                        </tr>
                    {{/each}}
                        </tbody>
                    </table>
        `        
        /* variabile che conterrà tutto l'html */
        let doc = `<style>
        ${bulma}
        </style>
        <div class="content is-basic">
        ${htmlText}
        </div>`

        //initialize template
        var template = Handlebars.compile(doc)
        var html = template(recommendations)
        return html
        
    },
    async savebase64AsPDF(path,base64){
      // Convert the base64 string in a Blob
        try {
            await Filesystem.writeFile({
                path: path,
                data: base64,
                directory: Directory.External,
              });
              alert('File salvato con successo')

        } catch (err){
            alert(err)
        }
      
    }
}


const bulma = `
.content li + li {
    margin-top: 0.25em;
  }
  
  .content p:not(:last-child),
  .content dl:not(:last-child),
  .content ol:not(:last-child),
  .content ul:not(:last-child),
  .content blockquote:not(:last-child),
  .content pre:not(:last-child),
  .content table:not(:last-child) {
    margin-bottom: 1em;
  }
  
  .content h1,
  .content h2,
  .content h3,
  .content h4,
  .content h5,
  .content h6 {
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
  }
  
  .content h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
  }
  
  .content h1:not(:first-child) {
    margin-top: 1em;
  }
  
  .content h2 {
    font-size: 1.75em;
    margin-bottom: 0.5714em;
  }
  
  .content h2:not(:first-child) {
    margin-top: 1.1428em;
  }
  
  .content h3 {
    font-size: 1.5em;
    margin-bottom: 0.6666em;
  }
  
  .content h3:not(:first-child) {
    margin-top: 1.3333em;
  }
  
  .content h4 {
    font-size: 1.25em;
    margin-bottom: 0.8em;
  }
  
  .content h5 {
    font-size: 1.125em;
    margin-bottom: 0.8888em;
  }
  
  .content h6 {
    font-size: 1em;
    margin-bottom: 1em;
  }
  
  .content blockquote {
    background-color: whitesmoke;
    border-left: 5px solid #dbdbdb;
    padding: 1.25em 1.5em;
  }
  
  .content ol {
    list-style-position: outside;
    margin-left: 2em;
    margin-top: 1em;
  }
  
  .content ol:not([type]) {
    list-style-type: decimal;
  }
  
  .content ol:not([type]).is-lower-alpha {
    list-style-type: lower-alpha;
  }
  
  .content ol:not([type]).is-lower-roman {
    list-style-type: lower-roman;
  }
  
  .content ol:not([type]).is-upper-alpha {
    list-style-type: upper-alpha;
  }
  
  .content ol:not([type]).is-upper-roman {
    list-style-type: upper-roman;
  }
  
  .content ul {
    list-style: disc outside;
    margin-left: 2em;
    margin-top: 1em;
  }
  
  .content ul ul {
    list-style-type: circle;
    margin-top: 0.5em;
  }
  
  .content ul ul ul {
    list-style-type: square;
  }
  
  .content dd {
    margin-left: 2em;
  }
  
  .content figure {
    margin-left: 2em;
    margin-right: 2em;
    text-align: center;
  }
  
  .content figure:not(:first-child) {
    margin-top: 2em;
  }
  
  .content figure:not(:last-child) {
    margin-bottom: 2em;
  }
  
  .content figure img {
    display: inline-block;
  }
  
  .content figure figcaption {
    font-style: italic;
  }
  
  .content pre {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    padding: 1.25em 1.5em;
    white-space: pre;
    word-wrap: normal;
  }
  
  .content sup,
  .content sub {
    font-size: 75%;
  }
  
  .content table {
    width: 100%;
  }
  
  .content table td,
  .content table th {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
    padding: 0.5em 0.75em;
    vertical-align: top;
  }
  
  .content table th {
    color: #363636;
  }
  
  .content table th:not([align]) {
    text-align: inherit;
  }
  
  .content table thead td,
  .content table thead th {
    border-width: 0 0 2px;
    color: #363636;
  }
  
  .content table tfoot td,
  .content table tfoot th {
    border-width: 2px 0 0;
    color: #363636;
  }
  
  .content table tbody tr:last-child td,
  .content table tbody tr:last-child th {
    border-bottom-width: 0;
  }
  
  .content .tabs li + li {
    margin-top: 0;
  }
  
  .content.is-small {
    font-size: 0.75rem;
  }
  
  .content.is-normal {
    font-size: 1rem;
  }
  
  .content.is-medium {
    font-size: 1.25rem;
  }
  
  .content.is-large {
    font-size: 1.5rem;
  }

  .is-basic {
    font-size:14px!important;
    line-height: 20px!important;
    font-family:Arial, Helvetica, sans-serif!important;
  }

  .centered {
    text-align:center!important;
  }
  
`
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

var blob = new Blob(byteArrays, {type: contentType});
return blob;
}
