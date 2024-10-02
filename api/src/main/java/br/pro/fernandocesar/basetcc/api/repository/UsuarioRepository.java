package br.pro.fernandocesar.basetcc.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.pro.fernandocesar.basetcc.api.domain.Usuario;

public interface UsuarioRepository  extends CrudRepository<Usuario,Long>{

    boolean existsByEmail(String email);
    
}


