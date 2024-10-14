package br.pro.fernandocesar.basetcc.api.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "FotoOcorrencia")
@Data
public class FotoOcorrencia {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ocorrencia;
    private Integer sequencia;
    private String localFoto;
    private String descricao;
    private String titulo;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getOcorrencia() {
		return ocorrencia;
	}
	public void setOcorrencia(int ocorrencia) {
		this.ocorrencia = ocorrencia;
	}
	public Integer getSequencia() {
		return sequencia;
	}
	public void setSequencia(Integer sequencia) {
		this.sequencia = sequencia;
	}
	public String getLocalFoto() {
		return localFoto;
	}
	public void setLocalFoto(String localFoto) {
		this.localFoto = localFoto;
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
    
    
}

    



    
