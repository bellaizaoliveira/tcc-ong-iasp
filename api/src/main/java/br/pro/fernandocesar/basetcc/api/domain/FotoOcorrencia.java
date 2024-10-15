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
}

    



    
