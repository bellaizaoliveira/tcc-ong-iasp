package br.pro.fernandocesar.basetcc.api.repository;


import org.springframework.data.repository.CrudRepository;

import br.pro.fernandocesar.basetcc.api.domain.DadosBasicos;
import java.util.List;

public interface DadosBasicosRepository extends CrudRepository<DadosBasicos, Long> {
    List<DadosBasicos> findByTabela(String tabela);
}
