import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) { }
  // Para consultar los Heroes segun lo que se busque
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }
  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }
  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&attr=superhero&_limit=6`);
  }
  // Para agregar un Heroe
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }
  // Actualizar un Heroe
  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required')
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }
  // Eliminar un heroe
  deleteHero(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      );
  }
}
