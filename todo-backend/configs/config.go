package configs

import "github.com/spf13/viper"

type config struct {
	API APIConfig
	DB  DBConfig
}

type APIConfig struct {
	Port string
}

type DBConfig struct {
	Port     string
	User     string
	Host     string
	Pass     string
	Database string
}

var cfg *config

func init() {
	viper.SetDefault("api.port", "3333")
	viper.SetDefault("database.port", "5432")
	viper.SetDefault("database.host", "localhost")
}

func Load() error {
	viper.SetConfigName("config")
	viper.SetConfigType("toml")
	viper.AddConfigPath(".")

	err := viper.ReadInConfig()
	if err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return err
		}
	}

	cfg = new(config)

	cfg.API = APIConfig{
		Port: viper.GetString("api.port"),
	}

	cfg.DB = DBConfig{
		Port:     viper.GetString("database.port"),
		User:     viper.GetString("database.user"),
		Host:     viper.GetString("database.host"),
		Pass:     viper.GetString("database.pass"),
		Database: viper.GetString("database.name"),
	}

	return nil
}

func GetDB() DBConfig {
	return cfg.DB
}

func GetApiPort() string {
	return cfg.API.Port
}
