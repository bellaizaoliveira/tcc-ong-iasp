package br.pro.fernandocesar.basetcc.api.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;



// Define a classe como uma entidade JPA que será mapeada para uma tabela no banco de dados.
@Entity

// Define o nome da tabela no banco de dados que será mapeada por esta entidade.
@Table(name = "Usuario")
@Data
public class Usuario {

    // Declara o campo 'id' como a chave primária da entidade.
    // O valor será gerado automaticamente pelo banco de dados.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    // Campo para armazenar o nome do usuário.
    private String nome;
    
    // Campo para armazenar o e-mail do usuário.
    private String email;
    
    // Campo para armazenar a senha do usuário.
    private String senha;
    
    // Campo para armazenar o nível de acesso do usuário.
    private String nivelAcesso;
    
    // Campo para armazenar o CPF do usuário.
    private String cpf;
    
    // Campo para armazenar o telefone do usuário.
    private String telefone;
    
    // Campo para armazenar a data de cadastro do usuário.
    private LocalDateTime dataCadastro;
    
    // Campo para armazenar o status do usuário (ativo, inativo, etc.).
    private String statusUsuario;

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public String getStatusUsuario() {
		return statusUsuario;
	}

	public void setStatusUsuario(String statusUsuario) {
		this.statusUsuario = statusUsuario;
	}

   
}
