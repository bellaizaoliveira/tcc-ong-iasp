package com.teste_navigation.iasp_ong;

public class ApiService {
    import retrofit2.Call;
    import retrofit2.http.GET;
    import retrofit2.http.Path;
    import java.util.List;

    public interface ApiService {
        @GET("ocorrencias") // Substitua pelo caminho correto da sua API
        Call<List<Ocorrencias>> getOcorrencias();

        @GET("ocorrencias/{id}")
        Call<Ocorrencias> getOcorrenciaById(@Path("id") int id);
    }

}
