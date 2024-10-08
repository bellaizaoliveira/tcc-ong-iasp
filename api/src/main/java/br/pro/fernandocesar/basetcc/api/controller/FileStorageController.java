package br.pro.fernandocesar.basetcc.api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/filestorage")
public class FileStorageController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // @PostMapping("/upload")
    // public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile
    // file) {
    // try {
    // String uniqueFileName = UUID.randomUUID().toString() + "_" +
    // file.getOriginalFilename();
    // Path path = Paths.get(uploadDir, uniqueFileName);
    // Files.createDirectories(path.getParent());
    // file.transferTo(path);
    // return ResponseEntity.ok("Arquivo enviado com sucesso: " + uniqueFileName);
    // } catch (IOException e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao
    // enviar o arquivo: " + e.getMessage());
    // }
    // }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        // Validação: Verificar se o arquivo não está vazio
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("O arquivo está vazio.");
        }

        // Validação: Verificar tipo de arquivo permitido
        String contentType = file.getContentType();
        if (!isAllowedContentType(contentType)) {
            return ResponseEntity.badRequest()
                    .body("Tipo de arquivo não permitido. Apenas imagens e PDFs são permitidos.");
        }

        // Validação: Verificar tamanho máximo do arquivo
        long maxFileSize = 5 * 1024 * 1024; // 5 MB
        if (file.getSize() > maxFileSize) {
            return ResponseEntity.badRequest().body("O arquivo excede o tamanho máximo permitido de 5 MB.");
        }

        try {
            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir, uniqueFileName);
            Files.createDirectories(path.getParent());
            file.transferTo(path);
            return ResponseEntity.ok("Arquivo enviado com sucesso: " + uniqueFileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar o arquivo: " + e.getMessage());
        }
    }

    private boolean isAllowedContentType(String contentType) {
        // Lista de tipos de conteúdo permitidos: imagens e PDF
        List<String> allowedTypes = Arrays.asList("image/jpeg", "image/png", "image/gif", "application/pdf");
        return allowedTypes.contains(contentType);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) {
        try {
            Path path = Paths.get(uploadDir, filename);
            byte[] data = Files.readAllBytes(path);
            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM; // Tipo padrão

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(mediaType);
            headers.setContentDispositionFormData("inline", filename); // Para visualização inline
            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String filename) {
        try {
            Path path = Paths.get(uploadDir, filename);
            byte[] data = Files.readAllBytes(path);
            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM; // Tipo padrão para downloads

            // Tentar determinar o tipo de mídia baseado na extensão do arquivo
            String contentType = Files.probeContentType(path);
            if (contentType != null) {
                mediaType = MediaType.parseMediaType(contentType);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(mediaType);
            headers.setContentDispositionFormData("attachment", filename); // Para download
            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
