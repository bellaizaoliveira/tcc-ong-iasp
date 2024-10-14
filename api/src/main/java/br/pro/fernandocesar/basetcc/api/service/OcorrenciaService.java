package br.pro.fernandocesar.basetcc.api.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import br.pro.fernandocesar.basetcc.api.domain.Ocorrencia;

import br.pro.fernandocesar.basetcc.api.repository.OcorrenciaRepository;
import jakarta.transaction.Transactional;

@Service
public class OcorrenciaService {
    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Ocorrencia> listarOcorrencias() {
        return (List<Ocorrencia>) ocorrenciaRepository.findAll();
    }

    public Optional<Ocorrencia> buscarOcorrenciaPorId(Long id) {
        return ocorrenciaRepository.findById(id);
    }

    public Ocorrencia criarOcorrencia(Ocorrencia ocorrencia) {
        validarOcorrencia(ocorrencia);
        return ocorrenciaRepository.save(ocorrencia);
    }

    public Ocorrencia atualizarOcorrencia(Long id, Ocorrencia ocorrencia) {
        validarOcorrencia(ocorrencia);
        ocorrencia.setId(id);
        return ocorrenciaRepository.save(ocorrencia);
    }

    // public List<Map<String, Object>> listarOcorrenciasCompleta(String
    // formattedDataInicio, String formattedDataFim) {

    // // Verifica se as datas são nulas
    // if (formattedDataInicio == null || formattedDataFim == null) {
    // throw new IllegalArgumentException("As datas de início e fim não podem ser
    // nulas.");
    // }

    // String sql = "SELECT Ocorrencia.id, Ocorrencia.dataOcor,
    // Ocorrencia.descricao, Ocorrencia.titulo, Ocorrencia.logradouro,
    // Ocorrencia.numero, Ocorrencia.cep, Ocorrencia.cidade, Ocorrencia.uf,
    // Ocorrencia.pontoRef, "
    // +
    // "(SELECT TOP 1 localfoto FROM FotoOcorrencia WHERE FotoOcorrencia.ocorrencia
    // = Ocorrencia.id AND FotoOcorrencia.sequencia = 1) AS fotoPrincipal, "
    // +
    // "Ocorrencia.tipoOcorrencia, Ocorrencia.statusOcor, Ocorrencia.usuario, " +
    // "Tipo_Ocorrencia.nome AS nomeOcorrencia, Usuario.nome AS nomeUsuario,
    // Usuario.email AS emailUsuario, Tipo_Ocorrencia.descricao AS
    // descricaoOcorrencia "
    // +
    // "FROM Ocorrencia " +
    // "INNER JOIN Tipo_Ocorrencia ON Ocorrencia.tipoOcorrencia = Tipo_Ocorrencia.id
    // " +
    // "INNER JOIN Usuario ON Ocorrencia.usuario = Usuario.id " +
    // "WHERE Ocorrencia.dataOcor BETWEEN ? AND ? order by Ocorrencia.dataOcor ";

    // return jdbcTemplate.queryForList(sql, formattedDataInicio, formattedDataFim);
    // }

    public List<Map<String, Object>> listarOcorrenciasCompleta(String formattedDataInicio, String formattedDataFim) {

        // Verifica se as datas são nulas
        if (formattedDataInicio == null || formattedDataFim == null) {
            throw new IllegalArgumentException("As datas de início e fim não podem ser nulas.");
        }

        // Adiciona o horário às datas
        String dataInicioComHora = formattedDataInicio + " 00:00:00"; // Início do dia
        String dataFimComHora = formattedDataFim + " 23:59:59"; // Fim do dia

        String sql = "SELECT Ocorrencia.id, Ocorrencia.dataOcor, Ocorrencia.descricao, Ocorrencia.titulo, Ocorrencia.logradouro, Ocorrencia.numero, Ocorrencia.cep, Ocorrencia.cidade, Ocorrencia.uf, Ocorrencia.pontoRef, "
                +
                "(SELECT TOP 1 localfoto FROM FotoOcorrencia WHERE FotoOcorrencia.ocorrencia = Ocorrencia.id AND FotoOcorrencia.sequencia = 1) AS fotoPrincipal, "
                +
                "Ocorrencia.tipoOcorrencia, Ocorrencia.statusOcor, Ocorrencia.usuario, " +
                "Tipo_Ocorrencia.nome AS nomeOcorrencia, Usuario.nome AS nomeUsuario, Usuario.email AS emailUsuario, Tipo_Ocorrencia.descricao AS descricaoOcorrencia "
                +
                "FROM Ocorrencia " +
                "left JOIN Tipo_Ocorrencia ON Ocorrencia.tipoOcorrencia = Tipo_Ocorrencia.id " +
                "left JOIN Usuario ON Ocorrencia.usuario = Usuario.id " +
                "WHERE Ocorrencia.dataOcor BETWEEN ? AND ? ORDER BY Ocorrencia.dataOcor";

        return jdbcTemplate.queryForList(sql, dataInicioComHora, dataFimComHora);
    }

    public List<Map<String, Object>> obterTipoOcorrencia() {
        String sql = "SELECT * from Tipo_Ocorrencia ";
        return jdbcTemplate.queryForList(sql);
    }

    private void validarOcorrencia(Ocorrencia ocorrencia) {
        // if (usuario.getNome() == null || usuario.getNome().trim().isEmpty()) {
        // throw new IllegalArgumentException("O nome do usuário não pode ser nulo ou
        // vazio.");
        // }

    }
    

    @Transactional
	public Ocorrencia criarOcorrencia(String email, Ocorrencia ocorrencia) {
	     validarOcorrencia(ocorrencia);
	     return ocorrenciaRepository.save(ocorrencia);
	}

}
