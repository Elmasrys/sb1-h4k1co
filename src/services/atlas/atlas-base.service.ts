import { OpenAIService } from '../../lib/openai';
import { KnowledgeBase } from '../../lib/knowledge-base';
import { Company } from '../../types/company';
import { EVE } from '../../types/eve';

export abstract class AtlasBaseService {
  protected openai: OpenAIService;
  protected knowledgeBase: KnowledgeBase;
  protected company: Company | null = null;
  protected activeEVEs: Map<string, EVE> = new Map();

  constructor() {
    this.openai = OpenAIService.getInstance();
    this.knowledgeBase = KnowledgeBase.getInstance();
  }

  public setCompany(company: Company) {
    this.company = company;
  }

  public setActiveEVEs(eves: EVE[]) {
    this.activeEVEs.clear();
    eves.forEach(eve => this.activeEVEs.set(eve.id, eve));
  }

  protected async validateOpenAI() {
    if (!this.openai.isInitialized()) {
      throw new Error('OpenAI API key not configured. Please add your API key in Settings.');
    }
  }

  protected async validateCompany() {
    if (!this.company) {
      throw new Error('No company context set');
    }
  }
}