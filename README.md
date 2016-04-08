# akula-rest-apis
RESP APIs para estados e municípios, bancos da FEBRABAN e FIPE

### Para começar atualize as dependencias

```
npm install
```

### Base de dados

Dentro da pasta sql estão os arquivos necessários para criação da base de dados dos serviços. Foi utilizado o PostGreSQL.

## Tabela FIPE

A Tabela Fipe expressa preços médios de veículos no mercado nacional, servindo apenas como um parâmetro para negociações ou avaliações. Os preços efetivamente praticados variam em função da região, conservação, cor, acessórios ou qualquer outro fator que possa influenciar as condições de oferta e procura por um veículo específico. [FIPE Veículos](http://veiculos.fipe.org.br/)

Este serviço permite listar **MARCAS**, **MODELOS** e **ANOS** dos veículos, disponibilizando os dados no formato JSON.

#### MARCAS:

Acesse através da URL:

```
http://localhost:3001/api/v1/fipe/:tipoVeiculo/marcas
```

onde __:tipoVeiculo__ pode ser:

- moto
- carro
- caminhao

O serviço retornará os dados no formato:

```json
[
	{"codigo":"1","nome":"Acura"},
	{"codigo":"2","nome":"Agrale"},
	{"codigo":"3","nome":"Alfa Romeo"}
]
```

#### MODELOS:

Acesse através da URL:

```
http://localhost:3001/api/v1/fipe/:tipoVeiculo/marcas/:codigoMarca/modelos
```

onde __:codigoMarca__ é o que código extraído do serviço anterior.

Retorno:

```json
[
	{"codigo":"010029-3","nome":"300 C 3.5 V6 249cv"},
	{"codigo":"010033-1","nome":"300 C 3.6 V6 286cv Aut."}
]
```

#### ANOS:

Acesse através da URL:

```
http://localhost:3001/api/v1/fipe/:tipoVeiculo/marcas/:codigoMarca/modelos/:codigoModelo/anos
```

onde __:codigoModelo__ é o que código extraído do serviço anterior.

Retorno:

```json
[
	{"codigo":"2360791","nome":"Zero KM a gasolina"},
	{"codigo":"2360792","nome":"2014 Gasolina"}
]
```

## Bancos

A lista de bancos associados da [FEBRABAN](http://www.febraban.org.br/Bancos.asp) pode ser consultada a partir deste serviço.

#### Lista de bancos

Acesse através da URL:

```
http://localhost:3001/api/v1/bancos
```

Retorno: 

```json
[
	{"codigo":"001","nome":"Banco do Brasil S.A."},
	{"codigo":"341","nome":"Banco Itaú S.A."}
]
```

#### Banco por código

Acesse através da URL:

```
http://localhost:3001/api/v1/bancos/codigo/:codigo
```

onde __:codigo__ é o código FEBRABAN do banco.

#### Banco por nome

Acesse através da URL:

```
http://localhost:3001/api/v1/bancos/nome/:nome
```

onde __:nome__ é o nome do banco. Aqui é possível inserir parte do nome do banco.

## Estados e municípios

A partir da planilha disponibilizada pelo [IBGE](http://www.ibge.gov.br/home/), através do link [Planilha Excel dos municípios do Brasil - Sidra - IBGE](http://www.sidra.ibge.gov.br/bda/territorio/download/munic.xls), foi possível gerar este serviço.

#### Lista de estados

Acesse através da URL:

```
http://localhost:3001/api/v1/federacao/estados
```

A lista de estados tem o seguinte formato:

```json
[
	{"uf":"AC","nome":"Acre"},
	{"uf":"AL","nome":"Alagoas"}
]
```

#### Lista de municípios

Acesse através da URL:

```
http://localhost:3001/api/v1/federacao/estados/:uf/municipios
```

onde __:uf__ é o código da UF do município do formato AA, por exemplo, para informar Pará -> PA.

Retorno:

```json
[
	{"ibge":"1500107","nome":"Abaetetuba"},
	{"ibge":"1500131","nome":"Abel Figueiredo"}	
]
```

#### Consulta por IBGE

Acesse através da URL:

```
http://localhost:3001/api/v1/federacao/estados/:uf/municipios/:ibge
```

onde __:ibge__ é o código do município.

Retorno:

```json
[
	{"uf":"PA","ibge":"1500859","nome":"Anapu"}
]
```

#### Consulta por nome

Acesse através da URL:

```
http://localhost:3001/api/v1/federacao/estados/:uf/municipios/n/:nome
```

onde __:nome__ é todo ou parte do nome do município. O serviço não faz diferença entre maiúsculas e minúsculas.

Retorno:

```json
[
	{"uf":"PA","ibge":"1500859","nome":"Anapu"}
]
```

## Tratamento de erro

Caso ocorra algum erro durante o processamento da solicitação, uma mensagem no formato a seguir será enviada:

```json
{"erro":"Not Found","det":{"status":404}}
```

Onde __det__ vai informar o detalhe do erro.