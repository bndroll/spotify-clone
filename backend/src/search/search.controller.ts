import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';


@Controller('search')
export class SearchController {
	constructor(
		private readonly searchService: SearchService
	) {
	}

	@Get(':text')
	@UseGuards(JwtAuthGuard)
	async search(@Param('text') text: string) {
		return this.searchService.search(text);
	}
}
