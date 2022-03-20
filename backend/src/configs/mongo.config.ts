import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoConnectionString(configService)
	}
}

const getMongoConnectionString = (configService: ConfigService): string => {
	return `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/spotify`
}