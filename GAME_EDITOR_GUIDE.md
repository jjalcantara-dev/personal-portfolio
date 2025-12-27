# Guía para Editar Mapas de Block Slide

## Ubicación del archivo

Los mapas están en: `lib/games/library.ts`

## Estructura de un mapa

Cada mapa tiene esta estructura:

```typescript
{
  id: 'block-slide-001',  // ID único (cambiar el número)
  type: 'block-slide',     // No cambiar
  title: {
    en: 'Block Slide',
    es: 'Deslizar Bloques'
  },
  instruction: {
    en: 'Move the red block to the exit...',
    es: 'Mueve el bloque rojo a la salida...'
  },
  board: {
    width: 7,   // Ancho del tablero (número de columnas)
    height: 7,   // Alto del tablero (número de filas)
    initialState: {
      blocks: [
        // Lista de bloques
      ],
      exit: { x: 5, y: 3 }  // Posición de salida (esquina superior izquierda)
    }
  },
  solution: {
    moves: [
      // Movimientos de solución (opcional, para referencia)
    ]
  }
}
```

## Cómo definir bloques

Cada bloque tiene estas propiedades:

```typescript
{
  id: 'target',           // ID único del bloque
  x: 0,                   // Posición X (columna, empieza en 0)
  y: 3,                   // Posición Y (fila, empieza en 0)
  width: 2,               // Ancho del bloque (en celdas)
  height: 1,              // Alto del bloque (en celdas)
  color: 'red',           // Color (solo 'red' para el objetivo, otros serán grises)
  isTarget: true          // true solo para el bloque rojo objetivo
}
```

## Sistema de coordenadas

- **X (columnas)**: 0 = izquierda, aumenta hacia la derecha
- **Y (filas)**: 0 = arriba, aumenta hacia abajo
- **Ejemplo**: `{ x: 0, y: 0 }` = esquina superior izquierda

## Ejemplo práctico: Crear un mapa 6x6

```typescript
{
  id: 'block-slide-008',  // Nuevo ID
  type: 'block-slide',
  title: {
    en: 'Block Slide',
    es: 'Deslizar Bloques'
  },
  instruction: {
    en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction.',
    es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección.'
  },
  board: {
    width: 6,
    height: 6,
    initialState: {
      blocks: [
        // Bloque objetivo (rojo) - debe tener isTarget: true
        { id: 'target', x: 0, y: 2, width: 2, height: 1, color: 'red', isTarget: true },
        
        // Bloques horizontales (height: 1)
        { id: 'h1', x: 2, y: 0, width: 2, height: 1, color: 'blue' },
        { id: 'h2', x: 2, y: 1, width: 2, height: 1, color: 'green' },
        
        // Bloques verticales (width: 1)
        { id: 'v1', x: 4, y: 0, width: 1, height: 2, color: 'yellow' },
        { id: 'v2', x: 4, y: 3, width: 1, height: 2, color: 'purple' },
        
        // Más bloques...
        { id: 'h3', x: 0, y: 4, width: 3, height: 1, color: 'orange' }
      ],
      exit: { x: 4, y: 2 }  // El bloque rojo debe llegar aquí
    }
  },
  solution: {
    moves: []  // Puedes dejarlo vacío o añadir la secuencia de solución
  }
}
```

## Reglas importantes

1. **Bloque objetivo**: Solo uno debe tener `isTarget: true` y `color: 'red'`
2. **Tamaño del bloque objetivo**: El `exit` debe tener espacio suficiente
   - Si el bloque objetivo es `width: 2, height: 1`, el exit debe tener 2 celdas horizontales libres
3. **Sin solapamientos**: Los bloques no pueden ocupar las mismas celdas
4. **Dentro del tablero**: Todos los bloques deben estar completamente dentro del tablero
   - `x + width <= board.width`
   - `y + height <= board.height`

## Herramienta visual para diseñar mapas

### Paso 1: Dibuja tu mapa en papel o editor

```
Tablero 6x6:
   0  1  2  3  4  5
0 [ ][ ][h1][h1][v1][ ]
1 [ ][ ][h2][h2][v1][ ]
2 [T][T][ ][ ][v2][ ]
3 [ ][ ][ ][ ][v2][ ]
4 [h3][h3][h3][ ][ ][ ]
5 [ ][ ][ ][ ][ ][ ]
```

### Paso 2: Anota las posiciones

- `T` = Target (rojo) en (0,2) con width:2, height:1
- `h1` = Bloque horizontal en (2,0) con width:2, height:1
- `v1` = Bloque vertical en (4,0) con width:1, height:2
- etc.

### Paso 3: Convierte a código

Usa las posiciones anotadas para crear el array de `blocks`.

## Consejos para crear mapas interesantes

1. **Dificultad progresiva**: Empieza con mapas pequeños (6x6) y pocos bloques
2. **Bloqueo estratégico**: Coloca bloques que obliguen a pensar la secuencia
3. **Variedad de tamaños**: Mezcla bloques de diferentes tamaños (1x1, 2x1, 3x1, 1x2, etc.)
4. **Prueba el mapa**: Después de crear, prueba que sea solucionable

## Añadir un nuevo mapa

1. Copia un mapa existente
2. Cambia el `id` (ej: `block-slide-008`)
3. Modifica `board.width` y `board.height`
4. Ajusta los bloques en `initialState.blocks`
5. Ajusta `exit` para que coincida con el tamaño del bloque objetivo
6. Añádelo al array `games` en `library.ts`

## Ejemplo completo: Mapa simple

```typescript
{
  id: 'block-slide-008',
  type: 'block-slide',
  title: {
    en: 'Block Slide',
    es: 'Deslizar Bloques'
  },
  instruction: {
    en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction.',
    es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección.'
  },
  board: {
    width: 5,
    height: 5,
    initialState: {
      blocks: [
        { id: 'target', x: 0, y: 2, width: 2, height: 1, color: 'red', isTarget: true },
        { id: 'h1', x: 2, y: 1, width: 2, height: 1, color: 'blue' },
        { id: 'v1', x: 4, y: 0, width: 1, height: 2, color: 'green' },
        { id: 'h2', x: 0, y: 4, width: 2, height: 1, color: 'yellow' }
      ],
      exit: { x: 3, y: 2 }
    }
  },
  solution: {
    moves: []
  }
}
```

## Verificar que funciona

Después de añadir un mapa:

1. Ejecuta `npm run build` para verificar que no hay errores
2. Ejecuta `npm run dev` para probar localmente
3. Navega a `/puzzles` y verifica que el mapa se ve correctamente
4. Prueba que el mapa sea solucionable

## Notas

- Los colores de los bloques (excepto el rojo) no importan visualmente, todos se muestran grises
- El `solution.moves` es opcional, puedes dejarlo vacío `[]`
- Puedes tener tantos mapas como quieras en el array `games`
- El sistema de selección diaria rotará automáticamente entre todos los mapas


