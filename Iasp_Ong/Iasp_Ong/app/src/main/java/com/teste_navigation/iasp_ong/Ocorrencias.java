package com.teste_navigation.iasp_ong;
    public class Ocorrencias {
        private int id;
        private String dataOcor;
        private String descricao;
        private String titulo;
        private String logradouro;
        private String numero;
        private String cep;
        private String cidade;
        private String uf;
        private String pontoRef;
        private int tipoOcorrencia;
        private String statusOcor;

        // Construtor vazio
        public Ocorrencias() {
        }

        // Construtor completo
        public Ocorrencias(int id, String dataOcor, String descricao, String titulo, String logradouro, String numero, String cep, String cidade, String uf, String pontoRef, int tipoOcorrencia, String statusOcor) {
            this.id = id;
            this.dataOcor = dataOcor;
            this.descricao = descricao;
            this.titulo = titulo;
            this.logradouro = logradouro;
            this.numero = numero;
            this.cep = cep;
            this.cidade = cidade;
            this.uf = uf;
            this.pontoRef = pontoRef;
            this.tipoOcorrencia = tipoOcorrencia;
            this.statusOcor = statusOcor;
        }

        // Getters e Setters para todos os campos
        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getDataOcor() {
            return dataOcor;
        }

        public void setDataOcor(String dataOcor) {
            this.dataOcor = dataOcor;
        }

        public String getDescricao() {
            return descricao;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public String getTitulo() {
            return titulo;
        }

        public void setTitulo(String titulo) {
            this.titulo = titulo;
        }

        public String getLogradouro() {
            return logradouro;
        }

        public void setLogradouro(String logradouro) {
            this.logradouro = logradouro;
        }

        public String getNumero() {
            return numero;
        }

        public void setNumero(String numero) {
            this.numero = numero;
        }

        public String getCep() {
            return cep;
        }

        public void setCep(String cep) {
            this.cep = cep;
        }

        public String getCidade() {
            return cidade;
        }

        public void setCidade(String cidade) {
            this.cidade = cidade;
        }

        public String getUf() {
            return uf;
        }

        public void setUf(String uf) {
            this.uf = uf;
        }

        public String getPontoRef() {
            return pontoRef;
        }

        public void setPontoRef(String pontoRef) {
            this.pontoRef = pontoRef;
        }

        public int getTipoOcorrencia() {
            return tipoOcorrencia;
        }

        public void setTipoOcorrencia(int tipoOcorrencia) {
            this.tipoOcorrencia = tipoOcorrencia;
        }

        public String getStatusOcor() {
            return statusOcor;
        }

        public void setStatusOcor(String statusOcor) {
            this.statusOcor = statusOcor;
        }
    }
