# Notes on EcoCor-DE 1.0.0 (2026-04-17)

## Corpus Description
The corpus contains 183 narrative fiction texts from 1754 to 1933. Genres are heterogeneous and include, e.g. novels, short stories, children's and youth literature, and travelogues. Texts stem from 94 authors. 101 texts are written by male authors, 83 by female authors; all texts are out of copyright. Text lengths vary from 119 to 223.836 words. Text sources are d-prose (including texts from Gutenberg, Textgrid, and KoLiMo), and Projekt-Gutenberg. The corpus has been created at the Hackathon “Environments as Networks” at the University of Potsdam 15. - 17. April 2026.

## Corpus Compilation Criteria and Workflow
EcoCor is designed as a sample of ecocritically relevant narrative texts. Ecocritical relevance is understood in its qualitative as well as quantitative meaning. Texts are ecocritically relevant if they have already been analysed from an ecocritical perspective, if they show an outstanding number, diversity, or relative frequency of ecological entities (i.e. animals and plants), or if they include important or interesting depictions of environmental aspects. The criteria of corpus creation accordingly have been:

Reference in at least one source of ecocritical research 
Outstanding quantities of ecological entities in a reference corpus
Important or interesting depictions of environmental aspects

The corpus was compiled using two approaches:
a) Distant Reading in the form of second-hand criticism (cf. Moretti 2013): Academic works from Ecocriticism have been read, and all primary sources noted. Sources out of copyright have been included in EcoCor.
b) Computational Analysis: Works identified as having a high or notably diverse frequency of animals and plants were included. A dictionary-based approach was used to identify ecological taxa in terms of their frequency and diversity. In order to reach authorial gender parity, we thus analysed two corpora: The [Corpus of German language fiction](https://figshare.com/articles/dataset/Corpus_of_German-Language_Fiction_txt_/4524680?file=7320866) (Fischer and Stroetgen 2017) and all (320) female-authored texts from [d-Prose](https://zenodo.org/records/5015008) (Gius et al. 2021). From both corpora, the following quantitatively outstanding texts were included in EcoCor:

– 10 texts with the highest relative frequency of animals and plants; without lower quartile; before mean(year)
– 10 texts with the highest relative frequency of animals and plants; without lower quartile; after mean(year)
– 10 texts with highest diversity of animals; without lower quartile; before mean(year)
– 10 texts with highest diversity of animals; without lower quartile; after mean(year)
– 10 texts with highest diversity of plants; without lower quartile; brfore mean(year)
– 10 texts with highest diversity of plants; without lower quartile; after mean(year)
– 10 texts with highest frequency of animalst; without lower quartile; before mean(year)
– 10 texts with highest frequency of animalst; without lower quartile; after mean(year)
– 10 texts with highest frequency of plants; without lower quartile; before mean(year)
– 10 texts with highest frequency of plants; without lower quartile; after mean(year)
– 10 texts with the highest relative quantity of animals and plants; lower quartile; before mean(year)
– 10 texts with the highest relative quantity of animals and plants; lower quartile; after mean(year)

Texts were manually marked up with chapter separators and automatically converted to ELTeC TEI-XML using the [ecocor-md-to-tei-script](https://github.com/dh-network/ecocor/blob/main/corpus/ecocor_md_to_tei.py) created by Daniil Skorinkin.

## Historical Context of Data
The works in the corpus were selected using quantitative methods addressing the prominence of nature and human-environment relationships within them. No additional selection criteria regarding qualitative or ethical considerations were applied. Due to the nature of this approach, the corpus contains texts that may include sexist, racist, antisemitic, or colonial wording or themes. We reserve the right to exclude texts in the future.

## Cite German EcoCor
A citable version of the German EcoCor can be found on Zenodo. Please follow the link to: [https://zenodo.org/records/19630113](https://zenodo.org/records/19630113) 

## Contributors:
Sören Barkey (University of Potsdam)
Mareike Schumacher (University of Regensburg)
Daniil Skorinkin (University of Potsdam)
Peer Trilcke (University of Potsdam)
Mark Schwindt (Ruhr-University Bochum)
Henny Sluyter-Gäthje (University of Potsdam)
Carsten Milling (University of Potsdam)
Ingo Börner (University of Potsdam)
Thomas Nikolaus Haider (University of Passau)
Clara Helmig  (University of Regensburg) 
Corinna Käb (Eberhard Karls University Tübingen) 
Bianca Ottenberg (University of Trier) 
Rebecca Daniel  (University of Trier) 
Clara Runa Schlör (FU Hagen)
Frank Fischer (Freie Universität Berlin)

## References
– Fischer, Frank and Strötgen, Jannik (2017). Corpus of German-Language Fiction (txt). figshare. Dataset. https://doi.org/10.6084/m9.figshare.4524680.v1
– Gius, Evelyn, Guhr, Svenja and Adelmann, Benedikt (2021). d-Prose 1870-1920 (2.0) [Data set]. Zenodo. https://doi.org/10.5281/zenodo.5015008
– Moretti, Franco (2013). Distant reading. Verso.

