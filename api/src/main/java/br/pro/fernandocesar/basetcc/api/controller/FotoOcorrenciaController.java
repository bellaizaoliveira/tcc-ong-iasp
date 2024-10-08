package br.pro.fernandocesar.basetcc.api.controller;

import br.pro.fernandocesar.basetcc.api.domain.FotoOcorrencia;
import br.pro.fernandocesar.basetcc.api.service.FotoOcorrenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fotoocorrencias")
public class FotoOcorrenciaController {

    @Autowired
    private FotoOcorrenciaService service;

    @GetMapping
    public List<FotoOcorrencia> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FotoOcorrencia> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ocorrencia/{ocorrencia}")
    public List<FotoOcorrencia> getByOcorrencia(@PathVariable int ocorrencia) {
        return service.findByOcorrencia(ocorrencia);
    }

    @PostMapping
    public FotoOcorrencia create(@RequestBody FotoOcorrencia fotoOcorrencia) {
        return service.save(fotoOcorrencia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FotoOcorrencia> update(@PathVariable Long id, @RequestBody FotoOcorrencia fotoOcorrencia) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        fotoOcorrencia.setId(id);
        return ResponseEntity.ok(service.save(fotoOcorrencia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
