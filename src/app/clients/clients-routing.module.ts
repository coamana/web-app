import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';

/** Translation Imports */
import { extract } from '../core/i18n/i18n.service';

/** Custom Components */
import { ClientsComponent } from './clients.component';
import { ClientsViewComponent } from './clients-view/clients-view.component';
import { GeneralTabComponent } from './clients-view/general-tab/general-tab.component';
import { FamilyMembersTabComponent } from './clients-view/family-members-tab/family-members-tab.component';
import { AddFamilyMemberComponent } from './clients-view/family-members-tab/add-family-member/add-family-member.component';
import { EditFamilyMemberComponent } from './clients-view/family-members-tab/edit-family-member/edit-family-member.component';
import { IdentitiesTabComponent } from './clients-view/identities-tab/identities-tab.component';
import { NotesTabComponent } from './clients-view/notes-tab/notes-tab.component';

/** Custom Resolvers */
import { ClientsResolver } from './common-resolvers/clients.resolver';
import { ClientViewResolver } from './common-resolvers/client-view.resolver';
import { ClientAccountsResolver } from './common-resolvers/client-accounts.resolver';
import { ClientChargesResolver } from './common-resolvers/client-charges.resolver';
import { ClientSummaryResolver } from './common-resolvers/client-summary.resolver';
import { ClientFamilyMembersResolver } from './common-resolvers/client-family-members.resolver';
import { ClientFamilyMemberResolver } from './common-resolvers/client-family-member.resolver';
import { ClientTemplateResolver } from './common-resolvers/client-template.resolver';
import { ClientIdentitiesResolver } from './common-resolvers/client-identities.resolver';
import { ClientNotesResolver } from './common-resolvers/client-notes.resolver';

const routes: Routes = [
  Route.withShell([{
    path: 'clients',
    data: { title: extract('Clients'), breadcrumb: 'Clients', routeParamBreadcrumb: false },
    children: [
      {
        path: '',
        component: ClientsComponent,
        resolve: {
          clientsData: ClientsResolver
        }
      },
      {
        path: ':clientId',
        component: ClientsViewComponent,
        data: { title: extract('Clients View'), routeParamBreadcrumb: 'clientId' },
        resolve: {
          clientViewData: ClientViewResolver,
        },
        children: [
          {
            path: 'general',
            component: GeneralTabComponent,
            resolve: {
              clientAccountsData: ClientAccountsResolver,
              clientChargesData: ClientChargesResolver,
              clientSummary: ClientSummaryResolver
            }
          },
          {
            path: 'family-members',
            children: [
              {
                path: '',
                component: FamilyMembersTabComponent,
                resolve: {
                  clientFamilyMembers: ClientFamilyMembersResolver
                }
              },
              {
                path: 'add',
                component: AddFamilyMemberComponent,
                resolve: {
                  clientTemplate: ClientTemplateResolver
                }
              },
              {
                path: ':familyMemberId',
                children: [{
                  path: 'edit',
                  component: EditFamilyMemberComponent,
                  resolve: {
                    clientTemplate: ClientTemplateResolver,
                    editFamilyMember: ClientFamilyMemberResolver
                  }
                }]
              }
            ]
          },
          {
            path: 'identities',
            component: IdentitiesTabComponent,
            resolve: {
              clientIdentities: ClientIdentitiesResolver
            }
          },
          {
            path: 'notes',
            component: NotesTabComponent,
            resolve: {
              clientNotes: ClientNotesResolver
            }
          }
        ]
      }
    ]
  }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ClientsResolver,
    ClientViewResolver,
    ClientAccountsResolver,
    ClientChargesResolver,
    ClientSummaryResolver,
    ClientFamilyMembersResolver,
    ClientFamilyMemberResolver,
    ClientTemplateResolver,
    ClientIdentitiesResolver,
    ClientNotesResolver
  ]
})
export class ClientsRoutingModule { }