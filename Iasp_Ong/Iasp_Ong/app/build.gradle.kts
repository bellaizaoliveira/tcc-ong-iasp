plugins {
    id("com.android.application")
}

android {
    namespace = "com.teste_navigation.iasp_ong"
    compileSdk = 33

    defaultConfig {
        applicationId = "com.teste_navigation.iasp_ong"
        minSdk = 24
        targetSdk = 33
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {

    // Dependências de UI e Layout
    implementation("androidx.appcompat:appcompat:1.7.0") // versão atualizada
    implementation("com.google.android.material:material:1.12.0") // versão atualizada
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")

    // Dependências de testes
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5") // versão atualizada
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1") // versão atualizada

    // Retrofit e dependências para comunicação com API
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.9.1")
}
