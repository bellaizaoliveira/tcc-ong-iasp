package com.teste_navigation.iasp_ong;
    public class Usuario {
        private int id;
        private String nome;
        private String email;
        private String senha;
        private String nivelAcesso;
        private String cpf;
        private String telefone;
        private String dataCadastro;
        private String statusUsuario;

        // Construtor vazio
        public Usuario() {
        }

        // Construtor completo
        public Usuario(int id, String nome, String email, String senha, String nivelAcesso, String cpf, String telefone, String dataCadastro, String statusUsuario) {
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.senha = senha;
            this.nivelAcesso = nivelAcesso;
            this.cpf = cpf;
            this.telefone = telefone;
            this.dataCadastro = dataCadastro;
            this.statusUsuario = statusUsuario;
        }

        // Getters e Setters para todos os campos
        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }

        public String getNivelAcesso() {
            return nivelAcesso;
        }

        public void setNivelAcesso(String nivelAcesso) {
            this.nivelAcesso = nivelAcesso;
        }

        public String getCpf() {
            return cpf;
        }

        public void setCpf(String cpf) {
            this.cpf = cpf;
        }

        public String getTelefone() {
            return telefone;
        }

        public void setTelefone(String telefone) {
            this.telefone = telefone;
        }

        public String getDataCadastro() {
            return dataCadastro;
        }

        public void setDataCadastro(String dataCadastro) {
            this.dataCadastro = dataCadastro;
        }

        public String getStatusUsuario() {
            return statusUsuario;
        }

        public void setStatusUsuario(String statusUsuario) {
            this.statusUsuario = statusUsuario;
        }
    }
