package br.pro.fernandocesar.basetcc.api.domain;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Ocorrencia")
@Data
public class Ocorrencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime dataOcor;
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

    @ManyToOne // Define o relacionamento muitos-para-um com Usuario
    @JoinColumn(name = "usuario_id") // Define o nome da coluna que vai armazenar a chave estrangeira
    private Usuario usuario; // Referência ao usuário associado
}