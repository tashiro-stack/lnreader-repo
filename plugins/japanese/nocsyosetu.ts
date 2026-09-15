import { Plugin } from '@typings/plugin';
import { fetchApi } from '@libs/fetch';
import { parseHTML } from 'cheerio';

class NocSyosetu implements Plugin.PluginBase {
  id = 'nocsyosetu';
  name = 'Nocturne Novels';
  icon = 'https://noc.syosetu.com/favicon.ico';
  site = 'https://noc.syosetu.com';
  version = '1.0.0';

  // 1. Catálogo de novelas populares o recientes en la página principal
  async popularNovels(page: number): Promise<Plugin.NovelItem[]> {
    const result = await fetchApi(`${this.site}/top/top/?p=${page}`);
    const body = await result.text();
    const loadedCheerio = parseHTML(body);

    const novels: Plugin.NovelItem[] = [];

    // Selector común para los bloques de novelas en Syosetu
    loadedCheerio('.novel_list').each((_, element) => {
      const novelUrl = loadedCheerio(element).find('a.title').attr('href');
      const novelName = loadedCheerio(element).find('a.title').text().trim();

      if (novelUrl) {
        novels.push({
          name: novelName,
          url: novelUrl,
        });
      }
    });

    return novels;
  }

  // 2. Buscador de novelas dentro de la web
  async parseSearch(
    searchTerm: string,
    page: number,
  ): Promise<Plugin.NovelItem[]> {
    const result = await fetchApi(
      `${this.site}/search/?word=${encodeURIComponent(searchTerm)}&p=${page}`,
    );
    const body = await result.text();
    const loadedCheerio = parseHTML(body);

    const novels: Plugin.NovelItem[] = [];

    loadedCheerio('.novel_list').each((_, element) => {
      const novelUrl = loadedCheerio(element).find('a.title').attr('href');
      const novelName = loadedCheerio(element).find('a.title').text().trim();

      if (novelUrl) {
        novels.push({
          name: novelName,
          url: novelUrl,
        });
      }
    });

    return novels;
  }

  // 3. Obtener detalles de una novela específica y su lista de capítulos
  async parseNovel(novelUrl: string): Promise<Plugin.SourceNovel> {
    const result = await fetchApi(this.site + novelUrl);
    const body = await result.text();
    const loadedCheerio = parseHTML(body);

    const novel: Plugin.SourceNovel = {
      url: novelUrl,
      title: loadedCheerio('.novel_title').text().trim(),
      summary: loadedCheerio('#novel_ex').text().trim(),
      chapters: [],
    };

    const chapters: Plugin.ChapterItem[] = [];
    loadedCheerio('.index_box .dl_list').each((index, element) => {
      const chapterUrl = loadedCheerio(element).find('a').attr('href');
      const chapterName = loadedCheerio(element).find('a').text().trim();

      if (chapterUrl) {
        chapters.push({
          name: chapterName,
          url: chapterUrl,
          chapterNumber: index + 1,
        });
      }
    });

    novel.chapters = chapters;
    return novel;
  }

  // 4. Obtener el contenido de texto de un capítulo
  async parseChapter(chapterUrl: string): Promise<string> {
    const result = await fetchApi(this.site + chapterUrl);
    const body = await result.text();
    const loadedCheerio = parseHTML(body);

    // Contenedor principal de texto en Syosetu/Nocturne
    return loadedCheerio('#novel_honbun').html() || '';
  }
}

export default new NocSyosetu();
