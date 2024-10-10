package br.pro.fernandocesar.basetcc.api.repository;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

import br.pro.fernandocesar.basetcc.api.domain.Ocorrencia;
import br.pro.fernandocesar.basetcc.api.domain.Usuario;

public interface OcorrenciaRepository extends CrudRepository<Ocorrencia, Long> {
    // Método para buscar ocorrências por um usuário específico
    List<Ocorrencia> findByUsuario(Usuario usuario);

    // Você também pode adicionar outros métodos de consulta conforme necessário
    List<Ocorrencia> findByStatusOcor(String statusOcor);
}
